
$(function () {
  $("#loader").show();
  $("#example1")
    .DataTable({
      responsive: true,
      lengthChange: false,
      paging: false,
      searching: false,
      autoWidth: false,
      processing: true,
      "language": {
                    "processing": "<i class='fa fa-spinner fa-spin' style='font-size:24px;color:rgb(75, 183, 245);'></i>"
                 }
      bLengthChange: false,
      bPaginate: true,
      bInfo: false,
      order: [[0, "desc"]],
      // language: {
      //   processing:
      //     "<img src='https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif'> Loading...",
      // },
      buttons: ["copy", "csv", "excel", "pdf", "print", "colvis"],
    })
    // .buttons()
    .container()
    .appendTo("#example1_wrapper .col-md-6:eq(0)");
  $("#example2").DataTable({
    paging: false,
    lengthChange: false,
    searching: false,
    ordering: true,
    info: true,
    autoWidth: false,
    responsive: true,
  });
});
$(document).ready(function () {
  $(".open-form").click(function () {
    $(".form-popup").show();
  });
  $(".close-form").click(function () {
    $(".form-popup").hide();
  });

  $(".reset-form").click(function () {
    $(".success-message").show();
    $("#my-form").trigger("reset");

    setTimeout(function () {
      $(".success-message").hide();
    }, 1500);
  });

  $(document).mouseup(function (e) {
    var container = $(".form-wrapper");
    var form = $(".form-popup");

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      form.hide();
    }
  });
});
