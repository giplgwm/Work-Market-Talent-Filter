var profiles = document.querySelectorAll('.profile-card');
profiles.forEach(profile => {
    //Find scores from each profile card;
    var t_body = profile.querySelector('.score-card--table').getElementsByTagName('tbody')[0]
    let table_rows = t_body.getElementsByTagName('tr')

    let paid_assign_section = table_rows[0].cells;

    let paid_assign_all_recent = paid_assign_section[1].innerText;
    let paid_assign_company_recent = paid_assign_section[3].innerText;
    let paid_assign_all = paid_assign_section[2].innerText;
    let paid_assign_all_company = paid_assign_section[4].innerText;

    if (paid_assign_all_company < 1) {
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