import {trigger, state, style, transition, animate, keyframes} from '@angular/core';

export var COLLAPSE_PROVIDERS = [ Collapse ];

export function Collapse(duration: number = 300) {
     return trigger('collapse', [
            state('false', 
                style({
                    height: '0',
                    opacity: '0',
                    overflow: 'hidden'
                })
            ),
            state('true', 
                style({
                    height: '*',
                    opacity: '1',
                })
            ),
            transition('false => true', 
            [
                animate(duration+'ms ease', keyframes([style({opacity: '1'}), style({height: '*'}) ]))
            ]),
            transition('true => false', 
            [ 
                animate(duration+'ms ease', style({height: '0',  overflow: 'hidden'}))
            ])
        ])
}