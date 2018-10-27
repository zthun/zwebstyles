import { safeDump } from 'js-yaml';
import { ZYamlLint } from './zyaml-lint.class';

describe('ZJsonLint', () => {
  let yaml: any;

  beforeEach(() => {
    yaml = {
      keyA: 'key-a',
      keyB: 'key-b'
    };
  });

  function createTestTarget() {
    return new ZYamlLint();
  }

  it('returns a resolved promise if the json is valid.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    // Assert
    expect(target.lint(safeDump(yaml))).resolves.toBeTruthy();
  });

  it('returns a rejected promise if the json is not valid.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    // Assert
    expect(target.lint('This is not valid yaml----\n\t\t\t\tinvalid')).rejects.toBeTruthy();
  });
});
