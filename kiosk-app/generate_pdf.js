const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument();

doc.pipe(fs.createWriteStream('public/assets/grilled_sea_bass_recipe.pdf'));

doc.fontSize(24).text('Grilled Sea Bass with Lemon', { align: 'center' });
doc.moveDown();

doc.fontSize(16).text('Ingredients:');
doc.fontSize(12).text('- 2 whole Sea Bass (cleaned and scaled)\n- 3 Limes or Lemons, sliced\n- 3 tablespoons Olive Oil\n- 4 cloves Garlic, minced\n- 1 tablespoon Fresh Thyme or Parsley\n- Salt and freshly ground Black Pepper to taste');
doc.moveDown();

doc.fontSize(16).text('Instructions:');
doc.fontSize(12).text('1. Preheat your grill to medium-high heat.\n\n2. Rinse the sea bass and pat dry with paper towels. Make 3 diagonal slits on each side of the fish to help it cook evenly and absorb flavors.\n\n3. Inside the cavity of each fish, stuff a few lemon slices, garlic, and thyme.\n\n4. Rub the outside of the fish generously with olive oil, salt, and pepper, making sure to get into the slits.\n\n5. Oil the grill grates to prevent sticking. Place the sea bass on the grill.\n\n6. Grill for 7-8 minutes per side, depending on thickness, until the skin is blistered and crisp, and the flesh is opaque and flakes easily with a fork.\n\n7. Remove from grill, let rest for a couple of minutes. Serve hot with extra lemon wedges.');

doc.end();
console.log('PDF generated successfully!');
