import Image from 'next/image'
import Stepper from './Stepper' // Import the component

export default function Header({ 
  activeStep, 
  onStepClick,          // <-- New: For the stepper
  onHeaderButtonClick,  // <-- New: For the button
  headerButtonText      // <-- New: For the button
}) {
    return(
        <header className="w-full h-[8vh] bg-surface-rise border-b p-2 print:hidden flex items-center justify-between">
            
            {/* Logo and Title Group (Stays the same) */}
            <div className="flex items-center">
                <div className="w-[8vw] min-w-[125px]"> 
                    <Image
                        src="/images/LogoBlack.svg"
                        alt="ebcont"
                        width={125}
                        height={125}
                        layout="responsive"
                    />
                </div>
                 <h1 className='hidden md:block md:text-2xl lg:text-3xl px-4 font-zilla-slab text-primary'>HR4U-Editor</h1>
            </div>

            {/* --- NEW: Right-side Group (Stepper + Button) --- */}
            <div className="flex items-center gap-6 md:gap-10 px-4">
              {/* Stepper Component: Now passes onStepClick */}
              <Stepper activeStep={activeStep} onStepClick={onStepClick} />

              {/* Contextual Button: Renders only if text/function are provided */}
              {headerButtonText && onHeaderButtonClick && (
                <button
                  onClick={onHeaderButtonClick}
                  // Assuming 'bg-primary' is your main purple color
                  className="bg-primary text-white font-bold py-2 px-6 rounded transition-colors hover:opacity-90"
                >
                  {headerButtonText}
                </button>
              )}
            </div>
            
        </header>
    )
}