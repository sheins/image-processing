import * as helpers from '../../../routes/api/helpers';
import path from 'path';

describe('helper functions for image api', async () => {
  const testImageName = 'fjord';
  const testImageHeight = 200;
  const testImageWidth = 200;

  beforeEach(() => {
    // mock console.log to keep the jasmine output clean
    spyOn(console, 'log');
  });

  const expectedThumbnailPath = path.resolve(
    './images/thumb/fjord-200-200.jpg'
  );

  it('returns the name for the thumbnail image', () => {
    expect(
      helpers.getThumbnailName(testImageName, testImageWidth, testImageHeight)
    ).toBe(`${testImageName}-${testImageWidth}-${testImageHeight}`);
  });

  it('returns the resolved expected path to the thumbnail image', () => {
    expect(
      helpers.getThumbnailPath(testImageName, testImageWidth, testImageHeight)
    ).toBe(expectedThumbnailPath);
  });

  it('returns the resolved expected path to the full image', () => {
    expect(helpers.getFullPath('fjord')).toBe(
      path.resolve('./images/full/fjord.jpg')
    );
  });

  it('throws an error if if the cached file does not exist', async () => {
    const getThumbnailPath = spyOn(helpers, 'getThumbnailPath').and.returnValue(
      expectedThumbnailPath
    );
    await expectAsync(
      helpers.existingCachedFile('fjorda', 799, 2001)
    ).toBeRejected();
    getThumbnailPath.calls.reset();
  });

  it('returns the available images in the full directory', () => {
    expect(helpers.getAvailableImages()).toEqual([
      'encenadaport',
      'fjord',
      'icelandwaterfall',
      'palmtunnel',
      'santamonica'
    ]);
  });
});
