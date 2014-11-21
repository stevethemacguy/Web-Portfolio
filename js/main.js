$(document).ready(function() {

    //Cache jQuery references
    var body = $("body");
    var mobileLogo = $("#mobile-logo");

    /* The width of each project section is 80% of the viewport (in order to stay centered). The Project sections are contained
       within a larger ".sliderContainer", which is repositioned left or right to display the appropriate project section.

       (Technically, The width of .sliderContainer is always N times the viewport, where N is the number of projects to display.
       For example, if there are 4 projects, than the width .sliderContainer will be 400%. But you can ignore this fact for the JS below)
    */
    //Used to calculate which project to "display" by using translateX on the sliderContainer.
    //The base width is always 80% of the body (i.e. viewport), and is recalculated when the window is resized.
    var projectBaseWidth, base2, base3, base4;
    updateProjectWidths();

    //Resizes the main background image to fill the viewable area of the window.
    function resizeBackground() {
        var viewportHeight = $(window).height();
        //Optionally account for the header height to add a border to the bottom of the screen.
        /*var headerHeight = $('header').outerHeight(false);
        viewportHeight = viewportHeight - headerHeight; //The current viewable area of the viewport window.*/
        $("#mainImage").css('height', viewportHeight);

    }

    //Resize the background when the page first loads
    resizeBackground();

    //Re-size the background when the browser is resized.
    $(window).resize(function() {
        resizeBackground();
        updateProjectWidths();
    });

    function updateProjectWidths()
    {
        projectBaseWidth = $(body).width() *.80;
        base2 = projectBaseWidth * 2;
        base3 = projectBaseWidth * 3;
        base4 = projectBaseWidth * 4;
    }

    $(".toggleTheme").click(function() {
        body.toggleClass("dark");

        //Change logo to black or teal based on light/dark theme
        if (body.hasClass("dark")) {
            $(this).text("Light Theme");
        }
        else {
            $(this).text("Dark Theme");
        }
    });

    //Scroll to Anchor (Desktop)
    $(".navContainer").find("a").click(function(event) {
        event.preventDefault();
        //Normal div offset minus the height of the header, since it's fixed.
        var sectionTop = $(this.hash).offset().top - $("header").outerHeight();
        $('html, body').animate({
            scrollTop: sectionTop
        }, 600, "easeOutCubic");
    });

    //Scroll to Anchor (Mobile)
    $(".mobileNav ul li").on("tap", function(event) {
        event.preventDefault();
        $(this).addClass("selected");
        $(".mobileNav ul").slideUp("fast");
        var anchor = $(this).find("a").attr("href");
        //Normal div offset minus the height of the header, since it's fixed.
        var sectionTop = $(anchor).offset().top - $("header").outerHeight();
        $('html, body').animate({
            scrollTop: sectionTop
        }, 400);
    });

    $("#project1Link").click(function()
    {
        $("#sliderContainer").css("transform","translateX(0)");
    });
    $("#project2Link").click(function()
    {
        $("#sliderContainer").css("transform","translateX("+ (-projectBaseWidth) + "px");
    });
    $("#project3Link").click(function()
    {
        $("#sliderContainer").css("transform","translateX("+ (-base2) + "px");
    });
    $("#project4Link").click(function()
    {
        $("#sliderContainer").css("transform","translateX("+ (-base3) + "px");
    });

    ////////////////// MOBILE JAVASCRIPT ONLY //////////////////
    //This code only affects the mobile version of the site.
    $("header").on("tap", function() {
        //Exit if not mobile
        if ($(window).width() >= 767) {
            return;
        }
        $(this).removeClass("selected");
        mobileLogo.toggleClass("selected");
        $(".mobile-button").toggleClass("selected");

        if (mobileLogo.hasClass("selected")) {
            $(this).find(".mobileNav ul").show();
            $(".mobileNav ul li").removeClass("selected");
        }
        else {
            $(this).find(".mobileNav ul").slideUp("fast");
        }
    });
    ////////////////// END MOBILE-ONLY SECTION //////////////////

    //Enable parallax effects
    $.stellar({
        horizontalScrolling: false,
        verticalOffset: 0
    });

    //These four logos animate at the same time, so cache the jquery objects
    var flyInIcons = $("#jiraLogo, #xamarinLogo, #phpLogo, #gitLogo");

    //When the any "fly-in" logo is in view, show all fly-in icons
    $("#xamarinLogo").on('inview', function(event, offscreen) {
        if (offscreen) {
            //no longer visible
        }
        else {
            flyInIcons.addClass("reveal");
            $(this).unbind('inview'); //Elements are now visible, so remove the binding
        }
    });
});
