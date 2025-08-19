import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function updateRingImages() {
  try {
    // Get all ring products
    const { data: rings, error: fetchError } = await supabase
      .from('products')
      .select('id, name')
      .eq('subcategory_id', '5da2cbcd-58e7-40e9-8064-377f8676b13f')
      .ilike('name', '%Ring%')
      .order('name');

    if (fetchError) {
      console.error('Error fetching rings:', fetchError);
      return;
    }

    console.log('Found rings:', rings);

    // Update each ring with an image path
    const imageUpdates = rings.map((ring, index) => {
      const imagePath = `rings/ring${index + 1}.png`;
      return supabase
        .from('products')
        .update({ images: [imagePath] })
        .eq('id', ring.id);
    });

    // Execute all updates
    const results = await Promise.all(imageUpdates);
    
    results.forEach((result, index) => {
      if (result.error) {
        console.error(`Error updating ring ${index + 1}:`, result.error);
      } else {
        console.log(`Successfully updated ring ${index + 1} with image: rings/ring${index + 1}.png`);
      }
    });

    // Verify the updates
    const { data: updatedRings, error: verifyError } = await supabase
      .from('products')
      .select('id, name, images')
      .eq('subcategory_id', '5da2cbcd-58e7-40e9-8064-377f8676b13f')
      .ilike('name', '%Ring%');

    if (verifyError) {
      console.error('Error verifying updates:', verifyError);
    } else {
      console.log('Updated rings with images:', updatedRings);
    }

  } catch (error) {
    console.error('Script error:', error);
  }
}

updateRingImages();
