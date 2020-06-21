// NOTE: This script needs to be run in the browser console on the html page
// downloaded via get-police-html.js
//
// This script transforms the table data into a JSON array of names, sorted alphabetically,
// and downloads the result.

var jsonData = JSON.stringify(
  Array.from(
    // For every useful <tr> there's one with an inline display:none. Select the
    // useful ones by either only universally unique indicator: an inline onclick
    // binding.
    document.querySelectorAll('tr[onclick]')
  ).map(
    // The second <td> contains the name of the officer.
    item => item.children[1].textContent
  ).sort()
);

var a = window.document.createElement('a');
a.href = window.URL.createObjectURL(new Blob([jsonData], {type: 'application/json'}));
a.download = 'police-names.json';
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
