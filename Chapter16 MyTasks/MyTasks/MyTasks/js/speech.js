/**********************************************
   Contains methods for talking out loud. 
   *******************************************/

(function () {
    "use strict";


    function say(text) {
        var audio = new Audio();
        var synth = new Windows.Media.SpeechSynthesis.SpeechSynthesizer();

        // Use Hazel's voice
        var voices = Windows.Media.SpeechSynthesis.SpeechSynthesizer.allVoices;
        for (var i = 0; i < voices.length; i++) {
            if (voices[i].displayName == "Microsoft Hazel Desktop") {
                synth.voice = voices[i];
            }
        }

        synth.synthesizeTextToStreamAsync(text).then(function (markersStream) {
            var blob = MSApp.createBlobFromRandomAccessStream(markersStream.ContentType, markersStream);
            audio.src = URL.createObjectURL(blob, { oneTimeOnly: true });
            audio.play();
        });
    }


    WinJS.Namespace.define("Speech", {
        say: say
    });


})();