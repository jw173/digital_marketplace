import * as Nav from 'front-end/lib/app/view/nav';
import { AppMsg, Immutable, PageModal, Toast } from 'front-end/lib/framework';
import * as PageContent from 'front-end/lib/pages/content';
import * as PageDashboard from 'front-end/lib/pages/dashboard';
import * as PageLanding from 'front-end/lib/pages/landing';
import * as PageLearnMoreCWU from 'front-end/lib/pages/learn-more/code-with-us';
import * as PageLearnMoreSWU from 'front-end/lib/pages/learn-more/sprint-with-us';
import * as PageNotFound from 'front-end/lib/pages/not-found';
import * as PageNotice from 'front-end/lib/pages/notice';
import * as PageOpportunityCWUCreate from 'front-end/lib/pages/opportunity/code-with-us/create';
import * as PageOpportunityCWUEdit from 'front-end/lib/pages/opportunity/code-with-us/edit';
import * as PageOpportunityCWUView from 'front-end/lib/pages/opportunity/code-with-us/view';
import * as PageOpportunityCreate from 'front-end/lib/pages/opportunity/create';
import * as PageOpportunities from 'front-end/lib/pages/opportunity/list';
import * as PageOpportunitySWUCreate from 'front-end/lib/pages/opportunity/sprint-with-us/create';
import * as PageOpportunitySWUEdit from 'front-end/lib/pages/opportunity/sprint-with-us/edit';
import * as PageOpportunitySWUView from 'front-end/lib/pages/opportunity/sprint-with-us/view';
import * as PageOrgCreate from 'front-end/lib/pages/organization/create';
import * as PageOrgEdit from 'front-end/lib/pages/organization/edit';
import * as PageOrgList from 'front-end/lib/pages/organization/list';
import * as PageOrgSWUTerms from 'front-end/lib/pages/organization/sprint-with-us-terms';
import * as PageProposalCWUCreate from 'front-end/lib/pages/proposal/code-with-us/create';
import * as PageProposalCWUEdit from 'front-end/lib/pages/proposal/code-with-us/edit';
import * as PageProposalCWUExportAll from 'front-end/lib/pages/proposal/code-with-us/export/all';
import * as PageProposalCWUExportOne from 'front-end/lib/pages/proposal/code-with-us/export/one';
import * as PageProposalCWUView from 'front-end/lib/pages/proposal/code-with-us/view';
import * as PageProposalList from 'front-end/lib/pages/proposal/list';
import * as PageProposalSWUCreate from 'front-end/lib/pages/proposal/sprint-with-us/create';
import * as PageProposalSWUEdit from 'front-end/lib/pages/proposal/sprint-with-us/edit';
import * as PageProposalSWUExportAll from 'front-end/lib/pages/proposal/sprint-with-us/export/all';
import * as PageProposalSWUExportOne from 'front-end/lib/pages/proposal/sprint-with-us/export/one';
import * as PageProposalSWUView from 'front-end/lib/pages/proposal/sprint-with-us/view';
import * as PageSignIn from 'front-end/lib/pages/sign-in';
import * as PageSignOut from 'front-end/lib/pages/sign-out';
import * as PageSignUpStepOne from 'front-end/lib/pages/sign-up/step-one';
import * as PageSignUpStepTwo from 'front-end/lib/pages/sign-up/step-two';
import * as PageUserList from 'front-end/lib/pages/user/list';
import * as PageUserProfile from 'front-end/lib/pages/user/profile';
import { includes } from 'lodash';
import { Session } from 'shared/lib/resources/session';
import { ADT } from 'shared/lib/types';

export type Route
  = ADT<'landing',              PageLanding.RouteParams>
  | ADT<'dashboard',            PageDashboard.RouteParams>
  | ADT<'opportunities',        PageOpportunities.RouteParams>
  | ADT<'opportunityCreate',    PageOpportunityCreate.RouteParams>
  | ADT<'learnMoreCWU',         PageLearnMoreCWU.RouteParams>
  | ADT<'learnMoreSWU',         PageLearnMoreSWU.RouteParams>
  | ADT<'content',              PageContent.RouteParams>
  | ADT<'signOut',              PageSignOut.RouteParams>
  | ADT<'signIn',               PageSignIn.RouteParams>
  | ADT<'signUpStepOne',        PageSignUpStepOne.RouteParams>
  | ADT<'signUpStepTwo',        PageSignUpStepTwo.RouteParams>
  | ADT<'notice',               PageNotice.RouteParams>
  | ADT<'notFound',             PageNotFound.RouteParams>
  | ADT<'userList',             PageUserList.RouteParams>
  | ADT<'userProfile',          PageUserProfile.RouteParams>
  | ADT<'orgCreate',            PageOrgCreate.RouteParams>
  | ADT<'orgList',              PageOrgList.RouteParams>
  | ADT<'orgEdit',              PageOrgEdit.RouteParams>
  | ADT<'orgSWUTerms',          PageOrgSWUTerms.RouteParams>
  | ADT<'proposalSWUCreate',    PageProposalSWUCreate.RouteParams>
  | ADT<'proposalSWUEdit',      PageProposalSWUEdit.RouteParams>
  | ADT<'proposalSWUView',      PageProposalSWUView.RouteParams>
  | ADT<'proposalSWUExportOne', PageProposalSWUExportOne.RouteParams>
  | ADT<'proposalSWUExportAll', PageProposalSWUExportAll.RouteParams>
  | ADT<'opportunitySWUCreate', PageOpportunitySWUCreate.RouteParams>
  | ADT<'opportunitySWUEdit',   PageOpportunitySWUEdit.RouteParams>
  | ADT<'opportunitySWUView',   PageOpportunitySWUView.RouteParams>
  | ADT<'opportunityCWUCreate', PageOpportunityCWUCreate.RouteParams>
  | ADT<'opportunityCWUEdit',   PageOpportunityCWUEdit.RouteParams>
  | ADT<'opportunityCWUView',   PageOpportunityCWUView.RouteParams>
  | ADT<'proposalCWUCreate',    PageProposalCWUCreate.RouteParams>
  | ADT<'proposalCWUEdit',      PageProposalCWUEdit.RouteParams>
  | ADT<'proposalCWUView',      PageProposalCWUView.RouteParams>
  | ADT<'proposalCWUExportOne', PageProposalCWUExportOne.RouteParams>
  | ADT<'proposalCWUExportAll', PageProposalCWUExportAll.RouteParams>
  | ADT<'proposalList',         PageProposalList.RouteParams>;

const routesAllowedForUsersWithUnacceptedTerms: Array<Route['tag']> = [
  'signUpStepTwo',
  'content',
  'learnMoreCWU',
  'learnMoreSWU',
  'signOut'
];

export function isAllowedRouteForUsersWithUnacceptedTerms(route: Route): boolean {
  return includes(routesAllowedForUsersWithUnacceptedTerms, route.tag);
}

export interface SharedState {
  session: Session;
}

export interface State {
  ready: boolean;
  transitionLoading: number;
  toasts: Array<Toast & { timestamp: number; }>;
  modal: {
    open: boolean;
    content: PageModal<Msg>;
  };
  shared: SharedState;
  activeRoute: Route;
  nav: Immutable<Nav.State>;
  pages: {
    landing?: Immutable<PageLanding.State>;
    dashboard?: Immutable<PageDashboard.State>;
    opportunities?: Immutable<PageOpportunities.State>;
    opportunityCreate?: Immutable<PageOpportunityCreate.State>;
    learnMoreCWU?: Immutable<PageLearnMoreCWU.State>;
    learnMoreSWU?: Immutable<PageLearnMoreSWU.State>;
    content?: Immutable<PageContent.State>;
    signOut?: Immutable<PageSignOut.State>;
    signUpStepOne?: Immutable<PageSignUpStepOne.State>;
    signUpStepTwo?: Immutable<PageSignUpStepTwo.State>;
    signIn?: Immutable<PageSignIn.State>;
    notice?: Immutable<PageNotice.State>;
    notFound?: Immutable<PageNotFound.State>;
    userList?: Immutable<PageUserList.State>;
    userProfile?: Immutable<PageUserProfile.State>;
    orgCreate?: Immutable<PageOrgCreate.State>;
    orgList?: Immutable<PageOrgList.State>;
    orgEdit?: Immutable<PageOrgEdit.State>;
    orgSWUTerms?: Immutable<PageOrgSWUTerms.State>;
    proposalSWUCreate?: Immutable<PageProposalSWUCreate.State>;
    proposalSWUEdit?: Immutable<PageProposalSWUEdit.State>;
    proposalSWUView?: Immutable<PageProposalSWUView.State>;
    proposalSWUExportOne?: Immutable<PageProposalSWUExportOne.State>;
    proposalSWUExportAll?: Immutable<PageProposalSWUExportAll.State>;
    opportunitySWUCreate?: Immutable<PageOpportunitySWUCreate.State>;
    opportunitySWUEdit?: Immutable<PageOpportunitySWUEdit.State>;
    opportunitySWUView?: Immutable<PageOpportunitySWUView.State>;
    opportunityCWUCreate?: Immutable<PageOpportunityCWUCreate.State>;
    opportunityCWUEdit?: Immutable<PageOpportunityCWUEdit.State>;
    opportunityCWUView?: Immutable<PageOpportunityCWUView.State>;
    proposalCWUCreate?: Immutable<PageProposalCWUCreate.State>;
    proposalCWUEdit?: Immutable<PageProposalCWUEdit.State>;
    proposalCWUView?: Immutable<PageProposalCWUView.State>;
    proposalCWUExportOne?: Immutable<PageProposalCWUExportOne.State>;
    proposalCWUExportAll?: Immutable<PageProposalCWUExportAll.State>;
    proposalList?: Immutable<PageProposalList.State>;
  };
}

type InnerMsg
  = ADT<'noop'>
  | ADT<'dismissToast',             number>
  | ADT<'dismissLapsedToasts'>
  | ADT<'closeModal'>
  | ADT<'nav',                      Nav.Msg>
  | ADT<'pageLanding',              PageLanding.Msg>
  | ADT<'pageDashboard',            PageDashboard.Msg>
  | ADT<'pageOpportunities',        PageOpportunities.Msg>
  | ADT<'pageOpportunityCreate',    PageOpportunityCreate.Msg>
  | ADT<'pageLearnMoreCWU',         PageLearnMoreCWU.Msg>
  | ADT<'pageLearnMoreSWU',         PageLearnMoreSWU.Msg>
  | ADT<'pageContent',              PageContent.Msg>
  | ADT<'pageSignIn',               PageSignIn.Msg>
  | ADT<'pageSignOut',              PageSignOut.Msg>
  | ADT<'pageSignUpStepOne',        PageSignUpStepOne.Msg>
  | ADT<'pageSignUpStepTwo',        PageSignUpStepTwo.Msg>
  | ADT<'pageNotice',               PageNotice.Msg>
  | ADT<'pageNotFound',             PageNotFound.Msg>
  | ADT<'pageUserList',             PageUserList.Msg>
  | ADT<'pageUserProfile',          PageUserProfile.Msg>
  | ADT<'pageOrgCreate',            PageOrgCreate.Msg>
  | ADT<'pageOrgList',              PageOrgList.Msg>
  | ADT<'pageOrgEdit',              PageOrgEdit.Msg>
  | ADT<'pageOrgSWUTerms',          PageOrgSWUTerms.Msg>
  | ADT<'pageProposalSWUCreate',    PageProposalSWUCreate.Msg>
  | ADT<'pageProposalSWUEdit',      PageProposalSWUEdit.Msg>
  | ADT<'pageProposalSWUView',      PageProposalSWUView.Msg>
  | ADT<'pageProposalSWUExportOne', PageProposalSWUExportOne.Msg>
  | ADT<'pageProposalSWUExportAll', PageProposalSWUExportAll.Msg>
  | ADT<'pageOpportunitySWUCreate', PageOpportunitySWUCreate.Msg>
  | ADT<'pageOpportunitySWUEdit',   PageOpportunitySWUEdit.Msg>
  | ADT<'pageOpportunitySWUView',   PageOpportunitySWUView.Msg>
  | ADT<'pageOpportunityCWUCreate', PageOpportunityCWUCreate.Msg>
  | ADT<'pageOpportunityCWUEdit',   PageOpportunityCWUEdit.Msg>
  | ADT<'pageOpportunityCWUView',   PageOpportunityCWUView.Msg>
  | ADT<'pageProposalCWUCreate',    PageProposalCWUCreate.Msg>
  | ADT<'pageProposalCWUEdit',      PageProposalCWUEdit.Msg>
  | ADT<'pageProposalCWUView',      PageProposalCWUView.Msg>
  | ADT<'pageProposalCWUExportOne', PageProposalCWUExportOne.Msg>
  | ADT<'pageProposalCWUExportAll', PageProposalCWUExportAll.Msg>
  | ADT<'pageProposalList',         PageProposalList.Msg>;

export type Msg = AppMsg<InnerMsg, Route>;
