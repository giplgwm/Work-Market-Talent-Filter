document.addEventListener('DOMContentLoaded', () => {
  const b_nojobsELEMENT = document.getElementById('b_nojobs');
  const b_nojobscompanyELEMENT = document.getElementById('b_nojobscompany');
  const b_abandoncompanyELEMENT = document.getElementById('b_abandoncompany');
  const b_abandonanyELEMENT = document.getElementById('b_abandonany');
  const saveButton = document.getElementById('save-settings');

  // Load settings
  chrome.storage.sync.get(['b_nojobs', 'b_nojobscompany', 'b_abandoncompany', 'b_abandonany'], (result) => {
    b_nojobsELEMENT.checked = result.b_nojobs || false;
	b_nojobscompanyELEMENT.checked = result.b_nojobscompany || false;
	b_abandoncompanyELEMENT.checked = result.b_abandoncompany || false;
	b_abandonanyELEMENT.checked = result.b_abandonany || false;
  });

  // Save settings
  saveButton.addEventListener('click', () => {
    const settings = {
	  b_nojobs: b_nojobsELEMENT.checked,
	  b_nojobscompany: b_nojobscompanyELEMENT.checked,
	  b_abandoncompany: b_abandoncompanyELEMENT.checked,
	  b_abandonany: b_abandonanyELEMENT.checked
    };
    chrome.storage.sync.set(settings, () => {
      console.log('Settings saved');
    });
  });
});
