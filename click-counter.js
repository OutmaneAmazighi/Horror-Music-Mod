// Add this after the scaffolding setup but before the run() function
let clickCount = 0;

// Modify the existing run function to include our click tracking
const originalRun = run;
run = async () => {
    await originalRun();
    
    // After the project is loaded, set up our click listener
    const appElement = document.getElementById('app');
    if (appElement) {
        appElement.addEventListener('mousedown', (e) => {
            clickCount++;
            console.log(`Click ${clickCount}: Position(x: ${e.clientX}, y: ${e.clientY})`);
            
            // Log the VM state to help debug
            if (window.vm) {
                console.log('VM state:', {
                    isRunning: window.vm.runtime.running,
                    frameCount: window.vm.runtime._projectTicker?._lastTime || 0
                });
            }
        });
    }
};

// Add listener to the scaffolding events if available
if (window.scaffolding) {
    scaffolding.addEventListener('PROJECT_RUN_START', () => {
        console.log('Project started - click tracking active');
    });
}