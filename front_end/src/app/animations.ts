import { animate, animation, keyframes, state, style, transition, trigger, useAnimation } from '@angular/animations';

export let bounceOutLeftAnimation = animation(
  animate(
    '0.5s ease-out',
    keyframes([
      style({ transform: 'translateX(20px)' }),
      style({ transform: 'translateX(-150%)' }),
    ])
  )
);

export let slide = trigger('slide', [
  transition(':enter', [
    style({ transform: 'translateX(-10px)' }),
    animate(500),
  ]),

  transition(':leave', [useAnimation(bounceOutLeftAnimation)]),
]);

export let fadeInAnimation = animation([
    style({ opacity: 0, transform: 'translateX(-20px)' }),
    animate('{{ duration }} {{ easing }}')
], {
    params: {
        duration: '0.5s',
        easing: 'ease-out'
    }
});

export let fade = trigger('fade', [

  transition(':enter', [
      useAnimation(fadeInAnimation)
  ]),

  transition(':leave', [
      animate(500, style({ opacity: 0 }))
    ]),
]);
