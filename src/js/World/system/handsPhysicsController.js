import { Group } from 'three';
import { sphere } from '../components/bodies/sphere';
import { hslToHex } from '../utils/colorUtils';
import { defaultColorMattPlastic } from '../components/materials/defaultColorMattPlastic';

const createHandsPhysicsController = (scene, physics, vrControls) => {
  const handleMaterial = defaultColorMattPlastic(
    hslToHex(0, 1, 1)
  );

  const handDistance = 0;

  const rightHandController = new Group();
  const rightHandAsset = sphere(handleMaterial, 0.04);
  rightHandAsset.position.z = handDistance;
  rightHandAsset.castShadow = true;
  rightHandController.add(rightHandAsset);

  scene.add(rightHandController);
  physics.add.existing(rightHandController);
  rightHandController.visible = false;
  rightHandController.body.setCollisionFlags(1);
  rightHandController.body.setBounciness(0.9);
  vrControls.addAssetToRightHand(rightHandController);

  const leftHandController = new Group();
  const leftHandAsset = sphere(handleMaterial, 0.04);
  leftHandAsset.position.z = handDistance;
  leftHandAsset.castShadow = true;
  leftHandController.add(leftHandAsset);

  scene.add(leftHandController);
  physics.add.existing(leftHandController);
  leftHandController.visible = false;
  leftHandController.body.setCollisionFlags(1);
  leftHandController.body.setBounciness(0.9);
  vrControls.addAssetToLeftHand(leftHandController);
}

export { createHandsPhysicsController };