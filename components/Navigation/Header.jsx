'use client'

import Image from 'next/image';
import Stepper from './Stepper';

export default function Header({ 
  activeStep, 
  onStepClick,
  onHeaderButtonClick,
  headerButtonText
}) {
    return(
        <header className="w-full h-[8vh] bg-surface-rise border-b border-border p-2 print:hidden flex items-center justify-between ">
            <div className="flex-1 flex items-center">
                <div className="w-[8vw] min-w-[125px]"> 
                  <a href='/'>
                    <Image
                        src="/images/LogoBlack.svg"
                        alt="ebcont"
                        width={125}
                        height={125}
                        layout="responsive"
                    />
                  </a>
                </div>
                 <h1 className='hidden md:block md:text-2xl lg:text-3xl px-4 font-zilla-slab text-primary'>HR4U-Editor</h1>
            </div>

            <div className="flex-1 flex justify-center">
              <Stepper activeStep={activeStep} onStepClick={onStepClick} />
            </div>

            <div className="flex-1 flex justify-end px-4">
              {headerButtonText && onHeaderButtonClick && (
                <button
                  onClick={onHeaderButtonClick}
                  className="bg-interactive text-text-on-interactive font-bold py-2 px-5  flex items-center gap-2 transition-colors hover:bg-interactive-hover"
                >
                  {headerButtonText.toUpperCase()}
                </button>
              )}
            </div> 
        </header>
    )
}