var profiles = document.querySelectorAll('.profile-card');
profiles.forEach(profile => {

    //Declare classes to organize our 12 variables a bit better.
    class PaidAssignments {
        constructor(paid_assign_section) {
            this.all = paid_assign_section[2].innerText;
            this.all90days = paid_assign_section[1].innerText;
            this.company = paid_assign_section[4].innerText;
            this.company90days = paid_assign_section[3].innerText;
        }
    }

    class AbandonedAssignments {
        constructor(abandoned_assign_section) {
            this.all = abandoned_assign_section[2].innerText;
            this.all90days = abandoned_assign_section[1].innerText;
            this.company = abandoned_assign_section[4].innerText;
            this.company90days = abandoned_assign_section[3].innerText;
        }
    }

    class CancelledAssignments {
        constructor(cancelled_assign_section) {
            this.all = cancelled_assign_section[2].innerText;
            this.all90days = cancelled_assign_section[1].innerText;
            this.company = cancelled_assign_section[4].innerText;
            this.company90days = cancelled_assign_section[3].innerText;
        }
    }


    //Find scores from each profile card;
    var t_body = profile.querySelector('.score-card--table').getElementsByTagName('tbody')[0]
    let table_rows = t_body.getElementsByTagName('tr')

    let paid_assign_section = table_rows[0].cells;
    let abandoned_assign_section = table_rows[1].cells;
    let cancelled_assign_section = table_rows[2].cells;

    const paid = new PaidAssignments(paid_assign_section);
    const abandoned = new AbandonedAssignments(abandoned_assign_section);
    const cancelled = new CancelledAssignments(cancelled_assign_section);

    console.log("PAID ASSIGNMENTS LAST 3 MONTHS: " + paid.all90days);
    console.log("PAID ASSIGNMENTS ALL: " + paid.all);
    console.log("PAID ASSIGNMENTS FROM CONCERT LAST 3 MONTHS: " + paid.company90days);
    console.log("PAID ASSIGNMENTS FROM CONCERT ALL: " + paid.company);

    console.log("ABANDONED ASSIGNMENTS LAST 3 MONTHS: " + abandoned.all90days);
    console.log("ABANDONED ASSIGNMENTS ALL: " + abandoned.all);
    console.log("ABANDONED ASSIGNMENTS FROM CONCERT LAST 3 MONTHS: " + abandoned.company90days);
    console.log("ABANDONED ASSIGNMENTS FROM CONCERT ALL: " + abandoned.company);

    console.log("CANCELLED ASSIGNMENTS LAST 3 MONTHS: " + cancelled.all90days);
    console.log("CANCELLED ASSIGNMENTS ALL: " + cancelled.all);
    console.log("CANCELLED ASSIGNMENTS FROM CONCERT LAST 3 MONTHS: " + cancelled.company90days);
    console.log("CANCELLED ASSIGNMENTS FROM CONCERT ALL: " + cancelled.company);
    if (paid.company < 1) {
        profile.classList.add('bad-tech');
    }
    return;
    let cancelled_section = table_rows[1];
    let cancelled_all_recent = 0;
    let cancelled_company_recent = 0;
    let cancelled_all = 0;
    let cancelled_all_company = 0;

    let abandoned_section = table_rows[2];
    let abandoned_all_recent = 0;
    let abandoned_all_company_recent = 0;
    let abandoned_all = 0;
    let abandoned_company = 0;
})
