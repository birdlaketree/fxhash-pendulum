import Stats from 'three/examples/jsm/libs/stats.module';

const stats = () => {
  s = Stats();
  document.body.appendChild(s.dom);
  return s;
}

export { stats };