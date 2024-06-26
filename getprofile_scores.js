(function() {
    // Create a function to get a storage value and return a promise
    function getStorageValue(key) {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({ action: "get_setting", key: key }, (response) => {
                if (response && response.value !== undefined) {
                    resolve(response.value);
                } else {
                    reject(`Failed to get setting: ${key}`);
                }
            });
        });
    }

    // Use Promise.all to wait for all storage values to be retrieved
    Promise.all([
        getStorageValue('b_nojobs'),
        getStorageValue('b_nojobscompany'),
        getStorageValue('b_abandoncompany'),
        getStorageValue('b_abandonany')
    ]).then(values => {
        const [b_nojobs, b_nojobscompany, b_abandoncompany, b_abandonany] = values;

        console.log("Filters applied:\nNo jobs: " + b_nojobs +
                    "\nNo jobs for company: " + b_nojobscompany +
                    "\nAbandoned jobs for company: " + b_abandoncompany +
                    "\nAbandoned any: " + b_abandonany);

        var profiles = document.querySelectorAll('.profile-card');

        // Declare classes within an IIFE to avoid global namespace pollution
        class PaidAssignments {
            constructor(paid_assign_section) {
                this.all = paid_assign_section[3].innerText;
                this.all90days = paid_assign_section[1].innerText;
                this.company = paid_assign_section[4].innerText;
                this.company90days = paid_assign_section[2].innerText;
            }
        }

        class AbandonedAssignments {
            constructor(abandoned_assign_section) {
                this.all = abandoned_assign_section[3].innerText;
                this.all90days = abandoned_assign_section[1].innerText;
                this.company = abandoned_assign_section[4].innerText;
                this.company90days = abandoned_assign_section[2].innerText;
            }
        }

        class CancelledAssignments {
            constructor(cancelled_assign_section) {
                this.all = cancelled_assign_section[3].innerText;
                this.all90days = cancelled_assign_section[1].innerText;
                this.company = cancelled_assign_section[4].innerText;
                this.company90days = cancelled_assign_section[2].innerText;
            }
        }

        profiles.forEach(profile => {
            // Find scores from each profile card
            var t_body = profile.querySelector('.score-card--table').getElementsByTagName('tbody')[0];
            let table_rows = t_body.getElementsByTagName('tr');

            let paid_assign_section = table_rows[0].cells;
            let cancelled_assign_section = table_rows[1].cells;
            let abandoned_assign_section = table_rows[2].cells;

            const paid = new PaidAssignments(paid_assign_section);
            const abandoned = new AbandonedAssignments(abandoned_assign_section);

            if (paid.company < 1 && b_nojobscompany) {
                profile.classList.add('bad-tech');
                return;
            }

            if (paid.any < 1 && b_nojobs) {
                profile.classList.add('bad-tech');
                return;
            }

            if (abandoned.company > 0 && b_abandoncompany) {
                profile.classList.add('bad-tech');
                return;
            }

            if (abandoned.any > 0 && b_abandonany) {
                profile.classList.add('bad-tech');
                return;
            }
        });
    }).catch(error => {
        console.error('Error retrieving storage values:', error);
    });
})();
