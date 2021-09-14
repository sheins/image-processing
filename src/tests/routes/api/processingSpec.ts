import * as processHelpers from '../../../routes/api/processing';
import * as helpers from '../../../routes/api/helpers';
import fs from 'fs';
import path from 'path';

describe('Test processing the image', () => {
  const testImageName = 'fjord';
  const testImageWidth = 200;
  const testImageHeight = 200;

  afterAll(() => {
    fs.unlink(
      `./images/thumb/${testImageName}-${testImageWidth}-${testImageHeight}.jpg`,
      () => {
        console.log('cleaning up test image');
      }
    );
  });

  it('returns a new image when a cached version does not already exist', async () => {
    const thumbnail = await processHelpers.thumbnailifyImage(
      testImageName,
      testImageWidth,
      testImageHeight
    );

    expect(thumbnail).toBe(
      path.resolve(
        `./images/thumb/${testImageName}-${testImageWidth}-${testImageHeight}.jpg`
      )
    );
  });

  it('throws an error when undefined params are passed in', async () => {
    await expectAsync(processHelpers.processImage()).toBeRejected();
  });

  it('throws an error when a bad filename is passed in', async () => {
    await expectAsync(
      processHelpers.processImage('abcd', testImageWidth, testImageHeight)
    ).toBeRejected();
  });

  it('returns the cached image path if one exists', async () => {
    const mockPathToFile = 'path/to/file.jpg';
    const existingCachedFile = spyOn(
      helpers,
      'existingCachedFile'
    ).and.returnValue(Promise.resolve(mockPathToFile));
    await expectAsync(
      processHelpers.processImage(
        testImageName,
        testImageWidth,
        testImageHeight
      )
    ).toBeResolvedTo(mockPathToFile);
    existingCachedFile.calls.reset();
  });

  it('returns a new thumbnail if cached image does not exist', async () => {
    await expectAsync(
      processHelpers.processImage(
        testImageName,
        testImageWidth + 1,
        testImageHeight
      )
    ).toBeResolvedTo(
      path.resolve(
        `./images/thumb/${testImageName}-${
          testImageWidth + 1
        }-${testImageHeight}.jpg`
      )
    );
  });
});
