
//@include "SceneDetection.jsx"
//@include "SDTester.jsx"

SceneDetection.tester.testSplitTimes(102);
SceneDetection.tester.numOfSplitsInRange([10, 200], 50);

SceneDetection.setThreshold(102);
SceneDetection.detectScenes();

//unload:
SceneDetection.unload();