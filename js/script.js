$('document').ready(function () {
    const noPromDiv1 = $('#noPromDiv1');
    const noPromDiv2 = $('#noPromDiv2');

    const promDiv1 = $('#promDiv1');
    const promDiv2 = $('#promDiv2');

    const clearButton = $('#clearButton');

    const noPromButton = $('#noPromButton');
    const promButton = $('#promButton');

    const countDiv1 = $('#countDiv1');
    const countDiv2 = $('#countDiv2');

    let count1 = 0;
    let count2 = 0;

    const delay = 3;

    let pi2;

    function setOutput(el, classStr, str) {
        el.addClass(classStr);
        el.html(str);
    }

    function resetOutput(el, classStr) {
        el.removeClass(classStr);
        el.html('');
    }

    noPromButton.click(function () {
        resetOutput(noPromDiv1, 'alert-primary');
        resetOutput(noPromDiv2, 'alert-secondary');
        countDiv1.html('Count: 0');
        count1 = 0;
        pi1 = setInterval(pInterval1, 1000);
        setTimeout(npTimer, 3000);
        setOutput(noPromDiv2, 'alert-secondary', 'Just couldn\t wait');
    });

    pInterval1 = function () {
        if (count1 == delay) {
            clearInterval(pi1);
        } else if (count1 < delay) {
            countDiv1.html('Count: ' + ++count1);
        }
    }

    function npTimer() {
        setOutput(noPromDiv1, 'alert-primary', 'Waiting on a timer');
    }

    function npoutput(str) {
        nop.innerHTML += ' ' + str;
    }

    promButton.click(function () {
        resetOutput(promDiv2, 'alert-light');
        resetOutput(promDiv1, 'alert-warning');
        countDiv2.html('Count: 0');
        count2 = 0;
        pi2 = setInterval(pInterval2, 1000);
        const p = createPromise();
        p.then(result => setOutput(promDiv2, 'alert-light', 'I also had to wait'));
    });

    pInterval2 = function () {
        if (count2 == delay) {
            clearInterval(pi2);
        } else if (count2 < delay) {
            countDiv2.html('Count: ' + ++count2);
        }
    }

    function createPromise() {
        return new Promise(function (res, rej) {
            setTimeout(() => {
                res(pTimer())
            }, 3000)
        });
    }

    function pTimer() {
        setOutput(promDiv1, 'alert-warning', 'Waiting on a timer');
    }

    clearButton.click(function () {
        resetOutput(noPromDiv1, 'alert-primary');
        resetOutput(noPromDiv2, 'alert-secondary');
        resetOutput(promDiv1, 'alert-warning');
        resetOutput(promDiv2, 'alert-light');
        countDiv1.html('Count: 0');
        countDiv2.html('Count: 0');
        count1 = 0;
        count2 = 0;
    });


});