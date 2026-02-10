const fs = require('fs');
const path = require('path');

describe('Project Foundation', () => {
  const projectRoot = path.resolve(__dirname, '..');

  test('index.html exists and contains CDN links', () => {
    const indexPath = path.join(projectRoot, 'index.html');
    expect(fs.existsSync(indexPath)).toBe(true);
    
    const content = fs.readFileSync(indexPath, 'utf-8');
    expect(content).toContain('three'); // Check for Three.js CDN
    expect(content).toContain('rapier'); // Check for Rapier CDN
    expect(content).toContain('style.css'); // Check for CSS link
    expect(content).toContain('main.js'); // Check for JS link
  });

  test('style.css exists', () => {
    const stylePath = path.join(projectRoot, 'style.css');
    expect(fs.existsSync(stylePath)).toBe(true);
  });

  test('main.js exists', () => {
    const mainPath = path.join(projectRoot, 'main.js');
    expect(fs.existsSync(mainPath)).toBe(true);
  });
});
