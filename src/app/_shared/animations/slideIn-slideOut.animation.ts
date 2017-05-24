import {trigger, state, style, transition, animate, keyframes} from '@angular/core';

export var SLIDE_PROVIDERS = [ Slide ];

export function Slide(duration: number = 300 , onflowY:number = -15) {
    return trigger('slide', [
            state('false', 
                style({
                    height: '0',
                    opacity: '0',
                    overflow: 'hidden',
                    visibility:'hidden',
                })
            ),
            state('true', 
                style({
                    height: '*',
                    opacity: '1',
                    visibility:'visible'
                })
            ),
            transition('false => true', 
            [
               animate(duration + 'ms ease-in',keyframes([
                    style({opacity: 0,transform: 'translateY(-100%)',height:'0', visibility:'visible', offset: 0}),
                    style({opacity: 0, transform: 'translateY('+ onflowY +'px)',height:'*',  visibility:'visible', offset: 0.3}),
                    style({opacity: 1, transform: 'translateY(0)', height:'*',    offset: 1.0})])
                )
            ]),
            transition('true => false', 
            [ 
               animate(duration + 'ms ease-in',keyframes([
                    style({opacity: 1, transform: 'translateY(0)', height:'*',  visibility:'visible',   offset: 0}),
                    style({opacity: 0, transform: 'translateY('+ onflowY +'px)',height:'*', visibility:'visible', offset: 0.7}),
                    style({opacity: 0, transform: 'translateY(-100%)',height:'0',  offset: 1.0})])
                )
            ])
        ])
}
