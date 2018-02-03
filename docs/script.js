

var objectUrl;



$("#audio").on("canplaythrough", function(e){
//    console.log("calculating duration");
    var seconds = e.currentTarget.duration;
    var duration = moment.duration(seconds, "seconds");
    var time = "";
    var hours = duration.hours();
    if (hours > 0) { time = hours + ":" ; }
    time = time + duration.minutes() + ":" + duration.seconds();

    $("#duration").text(time);

    URL.revokeObjectURL(objectUrl);
});



function add(filename, time, spaces_needed, start_total_string, end_total_string){
//      console.log("in add, time = ", time);
      if(start_total_string == "0"){
        start_total_string = "00:00"
      }
      //    $("#tracklist").html(time);
      $("#tracklist").append("<br>");
      var spaces = ""
      while(spaces_needed > 0){
        spaces = spaces + "&nbsp;&nbsp;"
        spaces_needed = spaces_needed - 1
      }
        //times on right side
        //$("#tracklist").append(filename + spaces + start_total_string + " - " + end_total_string);
        //times on left side
        $("#tracklist").append(start_total_string + " - " + end_total_string + "&nbsp;&nbsp;" + filename );

}

function erase(){
//  alert("cc")
      $("#tracklist").html("");
}

$("#file").change(function(e){
//    console.log("function");
    var file = e.currentTarget.files[0];
    var songs = e.currentTarget.files;
    var length = songs.length;

    console.log(songs);
//    console.log(length);

    //get maxlength of filename
    var maxlen = 0;
    for(i = 0; i < length; i++){
      if(maxlen < songs[i].name.length){
        maxlen = songs[i].name.length
      }
    }
//    console.log("maxlen:",maxlen)
  var count = 1;
  var maxlen = 0;
    var tl = "<br>";
    for(i = 0; i < length; i++){
        var filename = songs[i].name;
        var n = 0
        n = songs[i].name.lastIndexOf(".")
        filename = filename.substr(0, filename.lastIndexOf("."))
        var current_len = filename.length;
        tl = tl + filename + " ------ Duration: "
  //    fill in space to match up times
  //    console.log("current len:", current_len, " | maxlen: ", maxlen)
  //    while(current_len < maxlen){                                          //fix making ti look nice
  //        console.log("adding x, current_len = ", current_len)
  //        tl = tl + "_"
  //        current_len = current_len + 1
  //    }
        var seconds = 99;
        var count = 0;
        var start_total_seconds = 0;
        var end_total_seconds = 0;
        var start_total_string = "0";
        var end_total_string = "0";
        var total = 0;


        //songs = Filelist
        //create objectURL and audio object for songs[i]
        objectURL = URL.createObjectURL(songs[i]);
        mySound = new Audio([objectURL])

        //when mySound metadata is loaded:
        //when songs[i] metadata is loaded:
        mySound.addEventListener("canplaythrough", function(e){
          var seconds = e.currentTarget.duration;

          if(count == 0){
            start_total_seconds = 0
          }else{
            start_total_seconds = end_total_seconds
          }

          if(count == 0){
              end_total_seconds = seconds + end_total_seconds
          }else{
              end_total_seconds = seconds + end_total_seconds
          }
            var duration = moment.duration(end_total_seconds, "seconds");
            var time = "";
            var hours = duration.hours();
            if (hours > 0) { time = hours + ":" ; }
            var append_s = ""
            var append_m = ""
            if(duration.seconds() < 10){
              append_s = "0"
            }
            if(duration.minutes() < 10){
              append_m = "0"
            }
            end_total_string = time + append_m + duration.minutes() + ":" + append_s + duration.seconds();


            //convert start_total_seconds time
            var duration = moment.duration(start_total_seconds, "seconds");
            var time = "";
            var hours = duration.hours();
            if (hours > 0) { time = hours + ":" ; }
            var append_s = ""
            var append_m = ""
            if(duration.seconds() < 10){
              append_s = "0"
            }
            if(duration.minutes() < 10){
              append_m = "0"
            }
            start_total_string = time + append_m + duration.minutes() + ":" + append_s + duration.seconds();




          var duration = moment.duration(seconds, "seconds");
          var time = "";
          var hours = duration.hours();
          if (hours > 0) { time = hours + ":" ; }
          var append = ""
          if(duration.seconds() < 10){
            append = "0"
          }
          time = time + duration.minutes() + ":" + append + duration.seconds();



          var filename = songs[count].name;
          var n = 0
          n = songs[count].name.lastIndexOf(".")
          filename = filename.substr(0, filename.lastIndexOf("."))
          var current_len = filename.length;

          //get maxlength of filename

          for(i = 0; i < length; i++){
            //console.log("currentl;en = ", songs[i].name.length)
//            if(maxlen < songs[i].name.length){
//              maxlen = songs[i].name.length
//            }
            if(maxlen < songs[i].name.length){
              maxlen = songs[i].name.length
            }


          }
          console.log("maxlen = ", maxlen)
          console.log("currentlen = ", current_len)

          var spaces_needed = 0
  //        while(current_len < maxlen){
//
  //              spaces_needed = spaces_needed + 1
    //            current_len = current_len + 1
    //      }
        spaces_needed = maxlen - current_len
        console.log("spaceneeded = ", spaces_needed)

          console.log("playing["+i+"] "+ seconds + " . filename = " + filename)

          add(filename, time, spaces_needed, start_total_string, end_total_string)


          count = count + 1
        });
//        console.log("after even")

        tl = tl + seconds



        tl = tl + "<br>"
    }


    $("#filename").text(file.name);
    $("#filetype").text(file.type);
    $("#filesize").text(file.size);


    objectUrl = URL.createObjectURL(file);
    $("#audio").prop("src", objectUrl);
        console.log("end of file.change");
});
