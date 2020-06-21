// NOTE: This script needs to be run in the browser console on this page:
// http://seethroughny.net/payrolls/154722983
//
// The seethroughny does not expose a proper external API, only authenticating
// requests to itself (I tried hacking the permission via copying a session
// cookie and spoofing referrers, but was unsuccessful). In addition, the API
// only returns HTML one page at a time.
//
// Luckily, the ajax script used on the site is unminified and outputs a ton of
// debugging messages to the console, so it was possible to reverse engineer a
// recursive function that builds up the HTML in memory, then prompts to
// download.

var url = "/tools/required/reports/payroll?action=get";

var params = {
  PayYear: [
    "2019"
  ],
  BranchName: [
    "New York City"
  ],
  AgencyName: [
    "Police Department"
  ],
  SubAgencyName: [],
  PositionName: [],
  YTDPay: {},
  StartDate: {},
  EndDate: {},
  HireDate: {},
  SortBy: "YTDPay DESC",
  current_page: 0,
  result_id: "154722983",
  url: "/tools/required/reports/payroll?action=get",
  nav_request: 0
};

// Manually found through debugging statements.
var maxPages = 302;

var html = '<table><tbody>';

function myTimer() {
  if (params.current_page !== maxPages) {
    getData();
  }
  else {
    html += '</tbody></table>';
    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([html], {type: 'text/html'}));
    a.download = 'police-records.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

function getData() {
  $.ajax({
    url: url,
    dataType: "json",
    method: "POST",
    data: params,
    success: function (resp) {
      html += resp.html;
      params.current_page = params.current_page + 1;
      params.result_id = resp.result_id;
      window.setTimeout(myTimer, 2000);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(jqXHR, textStatus, errorThrown);
    }
  });
}

getData();
