import { Dispatch } from 'front-end/lib/framework';
import clickHandler from 'front-end/lib/framework/router/click-handler';
import { match, MatchFunction } from 'path-to-regexp';
import qs from 'querystring';
import { adt, ADT } from 'shared/lib/types';
import url from 'url';

export interface IncomingRoute<Route> {
  route: Route;
  preserveScrollPosition: boolean;
}

export type IncomingRouteMsg<Route> = ADT<'@incomingRoute', IncomingRoute<Route>>;

export type NewUrlMsg = ADT<'@newUrl', string>;

export function newUrl(url: string): NewUrlMsg {
  return {
    tag: '@newUrl',
    value: url
  };
}

export type ReplaceUrlMsg = ADT<'@replaceUrl', string>;

export function replaceUrl(url: string): ReplaceUrlMsg {
  return {
    tag: '@replaceUrl',
    value: url
  };
}

export type NewRouteMsg<Route> = ADT<'@newRoute', Route>;

export function newRoute<Route>(route: Route): NewRouteMsg<Route> {
  return {
    tag: '@newRoute',
    value: route
  };
}

export type ReplaceRouteMsg<Route> = ADT<'@replaceRoute', Route>;

export function replaceRoute<Route>(route: Route): ReplaceRouteMsg<Route> {
  return {
    tag: '@replaceRoute',
    value: route
  };
}

export type RouterMsg<Route>
  = NewRouteMsg<Route>
  | ReplaceRouteMsg<Route>
  | NewUrlMsg
  | ReplaceUrlMsg;

export type RouteParams = Record<string, string | undefined>;

export type RouteQuery = Record<string, string | string[] | undefined>;

export interface RouteDefinitionParams {
  path: string;
  params: RouteParams;
  query: RouteQuery;
}

export interface RouteDefinition<Route> {
  path: string;
  makeRoute(params: RouteDefinitionParams): Route;
}

export interface Router<Route> {
  routes: Array<RouteDefinition<Route>>;
  routeToUrl(route: Route): string;
}

//export function pushState<Route>(router: Router<Route>, route: Route) {
  //if (window.history && window.history.pushState) {
    //const url = router.routeToUrl(route);
    //window.history.pushState({ url }, '', url);
  //}
//}

//export function replaceState<Route>(router: Router<Route>, route: Route) {
  //if (window.history && window.history.replaceState) {
    //const url = router.routeToUrl(route);
    //window.history.replaceState({ url }, '', url);
  //}
//}

export function pushState(url: string): void {
  if (window.history && window.history.pushState) {
    window.history.pushState({ url }, '', url);
  }
}

export function replaceState(url: string): void {
  if (window.history && window.history.replaceState) {
    window.history.replaceState({ url }, '', url);
  }
}

function handleRoute<Route>(router: Router<Route>, route: Route, replace?: boolean): void {
  const url = router.routeToUrl(route);
  if (replace) {
    replaceState(url);
  } else {
    pushState(url);
  }
}

export interface Url {
  pathname: string;
  search: string;
}

export function parseUrl(s: string): Url {
  const parsed = url.parse(s);
  return {
    pathname: parsed.pathname || '',
    search: parsed.search || ''
  };
}

interface RouteManager<Route> {
  dispatchRoute(route: Route, preserveScrollPosition: boolean, replace?: boolean, skipHandle?: boolean): void;
  dispatchUrl(url: Url, preserveScrollPosition: boolean, replace?: boolean, skipHandle?: boolean): void;
  handleRouterMsg(msg: RouterMsg<Route>): boolean;
}

interface ProcessedRouteDefinition<Route> extends RouteDefinition<Route> {
  match: MatchFunction<RouteParams>;
}

type ProcessedRouter<Route> = Array<ProcessedRouteDefinition<Route>>;

export function makeRouteManager<State, Msg, Route>(router: Router<Route>, dispatch: Dispatch<IncomingRouteMsg<Route>>): RouteManager<Route> {
  const routes: ProcessedRouter<Route> = router.routes.map(definition => ({
    ...definition,
    match: match(definition.path)
  }));
  function urlToRoute(url: Url): Route | null {
    for (const definition of routes) {
      const path = url.pathname;
      const result = definition.match(path);
      if (result) {
        return definition.makeRoute({
          path,
          params: result.params,
          query: qs.parse(url.search.replace(/^\?+/, ''))
        });
      }
    }
    return null;
  }
  function dispatchRoute(route: Route, preserveScrollPosition: boolean, replace?: boolean, skipHandle?: boolean): void {
    if (!skipHandle) { handleRoute(router, route, replace); }
    dispatch(adt('@incomingRoute', { route, preserveScrollPosition }));
  }
  function dispatchUrl(url: Url, preserveScrollPosition: boolean, replace?: boolean, skipHandle?: boolean): void {
    const route = urlToRoute(url);
    if (route) { dispatchRoute(route, preserveScrollPosition, replace, skipHandle); }
  }
  function handleRouterMsg(msg: RouterMsg<Route>): boolean {
    const preserveScrollPosition = false;
    switch (msg.tag) {
      case '@newUrl':
        dispatchUrl(parseUrl(msg.value), preserveScrollPosition, false);
        return true;
      case '@replaceUrl':
        dispatchUrl(parseUrl(msg.value), preserveScrollPosition, true);
        return true;
      case '@newRoute':
        dispatchRoute(msg.value, preserveScrollPosition, false);
        return true;
      case '@replaceRoute':
        dispatchRoute(msg.value, preserveScrollPosition, true);
        return true;
    }
    return false;
  }
  return { dispatchRoute, dispatchUrl, handleRouterMsg };
}

export function start<Route>(routeManager: RouteManager<Route>): void {
  // Intercept link clicks.
  window.document.body.addEventListener('click', clickHandler(url => routeManager.dispatchUrl(url, false, false)), false);
  // Handle popstate events.
  window.addEventListener('popstate', e => {
    if (e.state && e.state.url) {
      routeManager.dispatchUrl(parseUrl(e.state.url), true, false, true);
    }
  });
  // Kick-start the router.
  routeManager.dispatchUrl({
    pathname: window.location.pathname,
    search: window.location.search
  }, true, true);
}
