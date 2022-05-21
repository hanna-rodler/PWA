'use strict'

//Import and rename your views here:
import {view as favourites} from '../views/view.favourites.js';
import {view as ideas} from '../views/view.ideas.js';
import {view as invites} from '../views/view.invites.js';
import {view as profile} from '../views/view.profile.js';
import {view as route404} from '../views/view.404.js?v=0.2';
/*******************************************************
 *     Hash-based router for Single Page Applications.
 *     Handles Routes behind a '/#/' to your convenience.
 *
 *     Hints:
 *     - If the browser-url does not fit to any known slug,
 *       by default the 404-Route will be loaded.
 *
 *     KWM - 2022-03-30
 *******************************************************/

export default class KWM_Router{
    constructor(){
        this.routes = [favourites, ideas, invites, profile, route404];
        this.homeRoute = favourites;
        this.route404 = route404;
        this.init();
        // console.log(this.routes);
    }

    init(){
        window.removeEventListener('hashchange', this.changeView);
        window.addEventListener('hashchange',this.changeView.bind(this));
        this.changeView();
    }

    changeView(){
        if (window.location.hash.length >= 2) {
            // console.log(this.routes);

            for (const route of this.routes) {
                if (route.isActive()){
                    route.init();
                    return;
                }
            }
            console.warn("I have no Idea where "+window.location.hash+" should be, but hey - taste some 404!");
            window.location.hash = this.route404.slug;
        } else
            window.location.hash = this.homeRoute.slug;
    }
}