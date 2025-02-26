import React, { useEffect, useRef, useState } from "react";
import ABCJS from "abcjs";
import Slider from "./components/ui/Slider";
import Card from "./components/ui/Card";

function MusicEditor() {
  const [abcNotation, setAbcNotation] = useState("X:1\nT:Example\nM:4/4\nL:1/4\nK:C\nC D E F | G A B c |");
  const renderRef = useRef(null);
  const synthRef = useRef(null);
  const [visualObj, setVisualObj] = useState(null);

  const [settings, setSettings] = useState({
    staffwidth: 600,
    scale: 1,
    notespacingfactor: 0.7,
  });

  useEffect(() => {
    if (renderRef.current) {
      const renderResult = ABCJS.renderAbc(renderRef.current, abcNotation, {
        add_classes: true,
        responsive: "resize",
        staffwidth: settings.staffwidth,
        scale: settings.scale,
        stafftopmargin: settings.notespacingfactor,
        visualTranspose: settings.scale,
        textboxpadding: settings.scale,
      })

      if (Array.isArray(renderResult) && renderResult.length > 0) {
        console.log("Render result:", renderResult);
        setVisualObj(renderResult[0]);
      }
    }
  }, [settings, abcNotation]);

  const playMusic = async () => {
    if (synthRef.current) synthRef.current.stop();

    if (!visualObj || !visualObj.lines) {
      console.error("Invalid visualObj", visualObj);
      return;
    }

    try {
      let myContext = new AudioContext();
      const synth = new ABCJS.synth.CreateSynth();
      synth.init({
        audioContext: myContext,
        visualObj: visualObj,
        millisecondsPerMeasure: 500
        // options: {
        //   soundFontUrl: "https://paulrosen.github.io/midi-js-soundfonts/FluidR3_GM/acoustic_grand_piano-mp3"
        // }
      }).then(function (results) {
          synth.start();
        // Ready to play. The results are details about what was loaded.
      }).catch(function (reason) {
        console.log(reason)
      });


    } catch (error) {
      console.error("Error initializing synthesizer:", error);
    }
  };

  const stopMusic = () => {
    if (synthRef.current) synthRef.current.stop();
  };

  return (
    <Card>
      <h2>Music Editor</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <h3>Editor</h3>
          <textarea
            rows={10}
            style={{ width: "100%" }}
            value={abcNotation}
            onChange={(e) => setAbcNotation(e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h3>Render</h3>
          <div ref={renderRef}></div>
        </div>
      </div>
      <Slider
        label="Scale"
        min={0.5}
        max={2}
        step={0.1}
        value={settings.scale}
        onChange={(val) => setSettings({ ...settings, scale: val })}
      />
      <Slider
        label="Note Spacing"
        min={0.5}
        max={2}
        step={0.1}
        value={settings.notespacingfactor}
        onChange={(val) => setSettings({ ...settings, notespacingfactor: val })}
      />
      <Slider
        label="Staff Width"
        min={400}
        max={1200}
        step={50}
        value={settings.staffwidth}
        onChange={(val) => setSettings({ ...settings, staffwidth: val })}
      />
      <button onClick={playMusic}>Play</button>
      <button onClick={stopMusic}>Stop</button>
    </Card>
  );
}
export default MusicEditor;

