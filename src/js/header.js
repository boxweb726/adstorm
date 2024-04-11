$(document).ready(function() {
  var menuOpen = false;
  
  // 메뉴 열기
  $("#hamburger-menu").click(function(event) {
    
      event.stopPropagation();
      $("#hamburger-menu").toggleClass("open");
      $(".menu-list").toggle();
      
      if (menuOpen) {
          $("#main").show();
          menuOpen = false;
      } else {
          $("#main").hide();
          menuOpen = true;
      }
  });
  
  // 메뉴 닫기
  $("#hamburger-menu.open").click(function() {
      $("#hamburger-menu").removeClass("open");
      $("#main").removeClass("overflow-hidden");
      $("#menu-container .menu-list").removeClass("active");
      $(".menu-list").hide();
  });
}); 