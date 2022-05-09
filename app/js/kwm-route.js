'use strict';
/*******************************************************
 *     Hash-based Routes for Single Page Applications.
 *     Routes are treated like Views. Each Route is
 *     therefore bound to one single (unique) View.
 *
 *     KWM - 2022-03-30
 *******************************************************/

export default class KWM_Route {
  constructor(slug, init) {
    this.slug = slug;
    this.init = init;
  }

  isActive() {
    if (kwm.utils.isEmpty(kwm.utils.getGetParameters())) {
      // console.log(window.location.hash.substr(1).replace('#', ''));
      return (window.location.hash.substr(1).replace('#', '') === this.slug);
    } else {
      let index = window.location.hash.substr(1).indexOf("?");
      // console.log(window.location.hash.substr(1, index).replace("#", ""));
      return (window.location.hash.substr(1, index).replace("#", "") === this.slug);
    }
  };
}