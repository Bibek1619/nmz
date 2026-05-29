// Cloudinary Test Script for Next.js
const cloudinary = require('cloudinary').v2;

// 1. Configure Cloudinary with inline credentials
cloudinary.config({
  cloud_name: 'djded5kbg',
  api_key: '856764161797492',
  api_secret: 'qYsgHyNzSKt_bEJPL1WJVjPWB28'
});

console.log('✓ Cloudinary configured\n');

async function testCloudinary() {
  try {
    // 2. Upload an image from Cloudinary demo
    console.log('Uploading sample image...');
    const uploadResult = await cloudinary.uploader.upload(
      'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      {
        folder: 'nmz-rahul-test',
        public_id: 'test-image-' + Date.now()
      }
    );
    
    console.log('✓ Image uploaded successfully!');
    console.log('Secure URL:', uploadResult.secure_url);
    console.log('Public ID:', uploadResult.public_id);
    console.log('');

    // 3. Get image details
    console.log('Image Details:');
    console.log('- Width:', uploadResult.width, 'px');
    console.log('- Height:', uploadResult.height, 'px');
    console.log('- Format:', uploadResult.format);
    console.log('- File Size:', uploadResult.bytes, 'bytes');
    console.log('');

    // 4. Transform the image
    // f_auto: Automatically selects the best format (WebP, AVIF, etc.) based on browser support
    // q_auto: Automatically adjusts quality for optimal file size while maintaining visual quality
    const transformedUrl = cloudinary.url(uploadResult.public_id, {
      fetch_format: 'auto',  // f_auto - automatic format selection
      quality: 'auto',       // q_auto - automatic quality optimization
      width: 800,
      crop: 'scale'
    });

    console.log('✓ Done! Click link below to see optimized version of the image.');
    console.log('Check the size and the format.');
    console.log('');
    console.log('Transformed URL:', transformedUrl);
    console.log('');
    console.log('Original size:', uploadResult.bytes, 'bytes');
    console.log('Open the transformed URL to see the optimized version!');

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the test
testCloudinary();
