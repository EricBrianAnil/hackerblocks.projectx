import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default class ContestRoute extends Route {
  @service store

  async model(params) {
    const practice = await this.store.findRecord('practice', params.practice_id, {
      include: 'contest'
    })
    const contest = await practice.contest
    const levels = await this.store.query('user_level', {
      filter: {
        contestId: contest.get('id')
      }
    })
    return RSVP.hash({
      practice,
      level: levels.toArray()[0]
    })
  }

  afterModel(model) {
    this.set('breadCrumb', {
      title: model.practice.name
    })
  }
}
