module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^three$': '<rootDir>/tests/mocks/three.js',
    '^three/addons/controls/OrbitControls.js$': '<rootDir>/tests/mocks/three-addons.js',
    '^@dimforge/rapier3d-compat$': '<rootDir>/tests/mocks/rapier.js'
  }
};