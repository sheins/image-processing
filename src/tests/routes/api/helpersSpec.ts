import * as helpers from '../../../routes/api/helpers';
import * as fs from 'fs';

describe('helper functions for image api', async () => {
  beforeEach(() => {
    // mock console.log to keep the jasmine output clean
    spyOn(console, 'log');
  });

  const expectedThumbnailPath =
    '/home/workspace/images/thumb/fjord-200-200.jpg';

  it('returns the name for the thumbnail image', () => {
    expect(helpers.getThumbnailName('fjord', 200, 200)).toBe('fjord-200-200');
  });

  it('returns the resolved expected path to the thumbnail image', () => {
    expect(helpers.getThumbnailPath('fjord', 200, 200)).toBe(
      expectedThumbnailPath
    );
  });

  it('returns the resolved expected path to the full image', () => {
    expect(helpers.getFullPath('fjord')).toBe(
      '/home/workspace/images/full/fjord.jpg'
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
