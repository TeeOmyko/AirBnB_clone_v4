$(document).ready(function(){
  $.get("http://0.0.0.0:5001/api/v1/status/", function(data){
    if (data.status == "OK") {
      $("DIV#api_status").addClass("available");
    } else {
      $("DIV#api_status").removeClass("available");
    }
  });

  const amenities = {};
    $("li input[type=checkbox]").change(function () {
      if (this.checked) {
        amenities[this.dataset.name] = this.dataset.id;
      } else {
        delete amenities[this.dataset.name];
      }
        $(".amenities h4").text(Object.keys(amenities).sort().join(", "));
  });
});
