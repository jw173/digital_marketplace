import { makePageMetadata } from 'front-end/lib';
import { Route, SharedState } from 'front-end/lib/app/types';
import { ComponentView, emptyPageAlerts, GlobalComponentMsg, Immutable, immutable, mapComponentDispatch, PageComponent, PageInit, toast, Update, updateComponentChild } from 'front-end/lib/framework';
import * as Phases from 'front-end/lib/pages/opportunity/sprint-with-us/lib/components/phases';
import * as TeamQuestions from 'front-end/lib/pages/opportunity/sprint-with-us/lib/components/team-questions';
import Accordion from 'front-end/lib/views/accordion';
import React from 'react';
import { Col, Row } from 'reactstrap';
import { adt, ADT } from 'shared/lib/types';

export interface State {
  toast: [string, string];
  teamQs: Immutable<TeamQuestions.State>;
  phases: Immutable<Phases.State>;
  showAccordion: boolean;
}

type InnerMsg
  = ADT<'noop'>
  | ADT<'showToast'>
  | ADT<'updateTeamQs', TeamQuestions.Msg>
  | ADT<'updatePhases', Phases.Msg>
  | ADT<'toggleAccordion'>;

export type Msg = GlobalComponentMsg<InnerMsg, Route>;

export type RouteParams = null;

const init: PageInit<RouteParams, SharedState, State, Msg> = async () => ({
  phases: immutable(await Phases.init({
    startWith: 'inception'
  })),
  teamQs: immutable(await TeamQuestions.init({})),
  toast: [
    'Example Toast',
    'This is an example toast. This is an example toast. This is an example toast. This is an example toast.'
  ],
  showAccordion: false
});

const update: Update<State, Msg> = ({ state, msg }) => {
  switch (msg.tag) {
    case 'updatePhases':
      return updateComponentChild({
        state,
        childStatePath: ['phases'],
        childUpdate: Phases.update,
        childMsg: msg.value,
        mapChildMsg: value => ({ tag: 'updatePhases', value })
      });
    case 'updateTeamQs':
      return updateComponentChild({
        state,
        childStatePath: ['teamQs'],
        childUpdate: TeamQuestions.update,
        childMsg: msg.value,
        mapChildMsg: value => ({ tag: 'updateTeamQs', value })
      });
    case 'showToast':
      return [
        state,
        async (state, dispatch) => {
          dispatch(toast(adt('info', {
            title: state.toast[0],
            body: state.toast[1]
          })));
          return null;
        }
      ];
    case 'toggleAccordion':
      return [state.update('showAccordion', v => !v)];
    default:
      return [state];
  }
};

const view: ComponentView<State, Msg> = ({state, dispatch}) => {
  return (
    <Row>
      <Col xs='12'>
        Landing page coming soon.
      </Col>
      <Col xs='12' className='pt-7'>
        <button onClick={() => dispatch(adt('showToast'))}>Show Toast</button>
      </Col>
      <Col xs='12' md='8' className='pt-7'>
        <Accordion
          toggle={() => dispatch(adt('toggleAccordion'))}
          color='blue-dark'
          title='Inception'
          titleClassName='h3'
          icon='map'
          iconWidth={2}
          iconHeight={2}
          iconClassName='mr-3'
          chevronWidth={1.5}
          chevronHeight={1.5}
          open={state.showAccordion}>
          Children!
        </Accordion>
      </Col>
      <Col xs='12' md='8' className='pt-7'>
        <TeamQuestions.view
          state={state.teamQs}
          dispatch={mapComponentDispatch(dispatch, msg => adt('updateTeamQs' as const, msg))} />
      </Col>
      <Col xs='12' md='8' className='pt-7'>
        <Phases.view
          state={state.phases}
          dispatch={mapComponentDispatch(dispatch, msg => adt('updatePhases' as const, msg))}
          disabled={false}
        />
      </Col>
    </Row>
  );
};

export const component: PageComponent<RouteParams, SharedState, State, Msg> = {
  init,
  update,
  view,
  getMetadata() {
    return makePageMetadata('Welcome');
  },
  getAlerts() {
    return {
      ...emptyPageAlerts(),
      info: [
        { text: 'first test alert' },
        { text: 'second test alert' }
      ],
      errors: [
        { text: 'first test alert' },
        { text: 'second test alert' }
      ]
    };
  },
  getBreadcrumbs() {
    return [
      { text: 'First' },
      { text: 'Second' }
    ];
  }
};
