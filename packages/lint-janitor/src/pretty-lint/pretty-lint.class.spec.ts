/* eslint-disable require-jsdoc */
import { check, FileInfoResult, getFileInfo, Options } from 'prettier';
import { ZPrettyLint } from './pretty-lint';

jest.mock('prettier');

describe('ZPrettyLint', () => {
  let options: Options;
  let info: FileInfoResult;
  let contentPath: string;
  let content: string;

  beforeEach(() => {
    contentPath = '/dev/test.json';
    content = '{ "key": "value" }';

    info = {
      ignored: false,
      inferredParser: 'json'
    };

    options = {};

    ((getFileInfo as unknown) as jest.Mock).mockClear();
    ((getFileInfo as unknown) as jest.Mock).mockResolvedValue(info);

    ((check as unknown) as jest.Mock).mockClear();
    ((check as unknown) as jest.Mock).mockReturnValue(true);
  });

  function createTestTarget() {
    return new ZPrettyLint();
  }

  it('returns a resolved promise if the content is formatted.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    // Assert
    await expect(target.lint(content, contentPath, options)).resolves.toBeTruthy();
  });

  it('returns a rejected promise if the content is unformatted.', async () => {
    // Arrange
    const target = createTestTarget();
    ((check as unknown) as jest.Mock).mockReturnValue(false);
    // Act
    // Assert
    await expect(target.lint(content, contentPath, options)).rejects.toBeTruthy();
  });

  it('checks the content with the appropriate parser.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    await target.lint(content, contentPath, options);
    // Assert
    expect(check).toHaveBeenCalledWith(content, expect.objectContaining({ parser: info.inferredParser }));
  });
});
