import * as React from 'react'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

import background from 'assets/maze-background.svg'
import css from './Pacman.module.css'

gsap.registerPlugin(MotionPathPlugin)

const isBrowser = typeof window !== `undefined`

export const Pacman: React.FC = () => {
  const tl = React.useRef<gsap.core.Timeline>()
  const tlProgress = React.useRef<number | undefined>(0)
  const pacmanWrapper = React.useRef(null)
  const pacmanTop = React.useRef(null)
  const pacmanBottom = React.useRef(null)

  const attachAnimation = (): gsap.Context => {
    return gsap.context(() => {
      tl.current = gsap
        .timeline()
        .to(
          pacmanWrapper.current,
          {
            motionPath: {
              path: '#pacman_path',
              align: '#pacman_path',
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
            },
            transformOrigin: '50% 50%',
            duration: 140,
            repeat: -1,
          },
          0
        )
        .to(
          pacmanTop.current,
          {
            duration: 0.4,
            rotation: 43,
            repeat: -1,
            yoyo: true,
            ease: 'power2.out',
          },
          0
        )
        .to(
          pacmanBottom.current,
          {
            duration: 0.4,
            rotation: -43,
            repeat: -1,
            yoyo: true,
            ease: 'power2.out',
          },
          0
        )
    })
  }

  React.useEffect(() => {
    if (isBrowser) {
      attachAnimation()
    }
  }, [attachAnimation])

  React.useEffect(() => {
    let ctx: gsap.Context

    const restartAnimation = (): void => {
      tlProgress.current = tl.current?.progress()
      tl.current?.progress(0).kill()
      ctx = attachAnimation()
      if (tlProgress.current) {
        tl.current?.progress(tlProgress.current)
      }
    }

    if (isBrowser) {
      window.addEventListener('resize', restartAnimation)
    }

    return () => {
      if (isBrowser) {
        window.removeEventListener('resize', restartAnimation)
        ctx?.revert()
      }
    }
  }, [])

  return (
    <div className={css.animation}>
      <img
        className={css.background}
        src={background}
        alt="Фон уровня игры «Пакмен»"
      />
      <svg
        className={css.pacmanPath}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 876">
        <path
          id="pacman_path"
          fill="transparent"
          fillRule="evenodd"
          d="M142.9,19.128H511.647v94.019h140.63v143.3H926.409V391.639H1057.64V663.646h231.68V801.433h-89.1v54.791H1055.37V665.916H926.085V526.832H514.563V665.267H650.657V799.812H924.14v56.412H513.915v-50.9H375.878v50.9H236.22v-53.17H142.574V663.322H371.989V115.093c-76.147,0-154.023.39-229.091,0V19.128Zm2.269,2.269v91.426H371.989V21.4H145.167Zm229.09,0V665.591H144.842V800.785h93.646v53.169H373.609v-50.9H516.184v50.9H921.872V802.081H648.389V667.537H512.295V524.563H928.353V663.646H1055.37V393.908H924.14V258.715H650.009v-143.3H509.379V21.4H374.257ZM1057.64,665.916V853.954h140.31v-54.79h89.11V665.916H1057.64Z"
        />
      </svg>
      <div ref={pacmanWrapper} className={css.pacman}>
        <div ref={pacmanTop} className={css.pacmanTop}></div>
        <div ref={pacmanBottom} className={css.pacmanBottom}></div>
      </div>
    </div>
  )
}
