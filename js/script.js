$('document').ready(function () {
    // Setting elements to variables
    const noPromDiv1 = $('#noPromDiv1');
    const noPromDiv2 = $('#noPromDiv2');

    const promDiv1 = $('#promDiv1');
    const promDiv2 = $('#promDiv2');

    const clearButton = $('#clearButton');

    const noPromButton = $('#noPromButton');
    const promButton = $('#promButton');

    const countDiv1 = $('#countDiv1');
    const countDiv2 = $('#countDiv2');
    
    // These counts are used to update the timer display
    let count1 = 0;
    let count2 = 0;

    // # seconds for timer
    const delay = 3; 
    
    // The interval objects for updating timer display
    let pi1;  
    let pi2;

    // Function used to update the div class and message
    function setOutput(el, classStr, str) {
        el.addClass(classStr);
        el.html(str);
    }

    // Opposite function of setOutput
    function resetOutput(el, classStr) {
        el.removeClass(classStr);
        el.html('');
    }

    noPromButton.click(function () {
        // Reset the no promise elements and timer
        resetOutput(noPromDiv1, 'alert-primary');
        resetOutput(noPromDiv2, 'alert-secondary');
        countDiv1.html('Count: 0');
        count1 = 0;
        //start the timer
        pi1 = setInterval(pInterval1, 1000); 
        // Belows starts the wait for the left div to update
        setTimeout(npTimer, 3000);
        // No promise here, so this is executed immediatly
        setOutput(noPromDiv2, 'alert-secondary', 'Just couldn\'t wait');
    });

    pInterval1 = function () {
        if (count1 == delay) {
            // Timer is completed, so stop counting
            clearInterval(pi1);
        } else if (count1 < delay) {
            // Updating the timer to # seconds elapsed
            countDiv1.html('Count: ' + ++count1);
        }
    }

    function npTimer() {
        // This is run after the timer completes
        // and updates the left div
        setOutput(noPromDiv1, 'alert-primary', 'Waiting on a timer');
    }

    promButton.click(function () {
        // Reset the no promise elements and timer
        resetOutput(promDiv2, 'alert-danger');
        resetOutput(promDiv1, 'alert-warning');
        countDiv2.html('Count: 0');
        count2 = 0;
        //start the timer
        pi2 = setInterval(pInterval2, 1000);
        // Here a promise is used to prevent the second
        // div from updating until the first div updates
        const p = createPromise();
        p.then(result => setOutput(promDiv2, 'alert-danger', 'I also had to wait'));
    });

    pInterval2 = function () {
        if (count2 == delay) {
            // Timer is completed, so stop counting
            clearInterval(pi2);
        } else if (count2 < delay) {
            // Updating the timer to # seconds elapsed
            countDiv2.html('Count: ' + ++count2);
        }
    }

    function createPromise() {
        // A promise is created and returned
        // allowing the ".then" function to 
        // be called to continue execution.
        // "res" is the "resolve" function that is called 
        // and results in a ".then" call, while 
        // "rej" is the "rejection" function to be used
        // and triggers a ".catch" to be executed. 
        return new Promise(function (res, rej) {
            setTimeout(() => {
                // "res" is the result function.
                // "rej is the rejection function, 
                res(pTimer())
            }, 3000)
        });
    }

    function pTimer() {
        // This is run after the timer completes
        // and updates the left div
        setOutput(promDiv1, 'alert-warning', 'Waiting on a timer');
    }

    clearButton.click(function () {
        // Resets everything to its initial state.
        resetOutput(noPromDiv1, 'alert-primary');
        resetOutput(noPromDiv2, 'alert-secondary');
        resetOutput(promDiv1, 'alert-warning');
        resetOutput(promDiv2, 'alert-danger');
        countDiv1.html('Count: 0');
        countDiv2.html('Count: 0');
        count1 = 0;
        count2 = 0;
    });


});