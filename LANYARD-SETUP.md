# Lanyard Component - Setup Guide

## ✅ What's Been Created

### 1. **LanyardProceduralCard.tsx**
A fully functional physics-based lanyard component with:
- **Procedural 3D Geometry**: No .glb file needed - card is created with code
- **Rapier Physics**: Realistic rope simulation with 4 linked joints
- **Interactive**: Drag the card and watch it swing with physics
- **Custom Textures**: 
  - Striped lanyard band (auto-generated)
  - Card texture from your anime image or fallback design

### 2. **Features**
- 🎮 **Draggable**: Click and drag the card
- 🔗 **Rope Joints**: 4 connected rigid bodies create realistic rope
- 🌊 **Gravity**: Card naturally hangs and swings
- ✨ **Lighting**: Environment lighting with Lightformers
- 📱 **Responsive**: Adjusts quality for mobile devices

### 3. **How to Add Your Anime Image**

#### Option 1: Use the Public Folder (Recommended)
1. Save your anime image as: `public/anime-card.jpg`
2. It will automatically load on the card
3. That's it!

#### Option 2: Direct Path in ThreeScene.tsx
Change the `cardImageUrl` in ThreeScene.tsx:
```tsx
const cardImageUrl = '/path/to/your/image.jpg';
```

### 4. **Image Specifications**
- **Format**: JPG or PNG
- **Recommended Size**: 512x768 pixels (portrait)
- **Aspect Ratio**: 2:3 (standard ID card)
- Your anime silhouette image will work perfectly!

### 5. **Fallback Design**
If no image is found, the card displays:
- Dark gradient background
- Cyan border glow
- "ID CARD" text
- "Portfolio Access" subtitle

## 🎨 Customization Options

### In ThreeScene.tsx:
```tsx
<Lanyard 
  position={[0, 0, 24]}      // Camera distance
  gravity={[0, -40, 0]}      // Gravity strength
  cardImage="/your-image.jpg" // Card texture
/>
```

### In LanyardProceduralCard.tsx:
- **Line 62-86**: Modify `createLanyardTexture()` to change band pattern
- **Line 89-124**: Modify `createCardTexture()` to change fallback design
- **Line 280-315**: Adjust card geometry (size, colors, metalness)

## 🔧 Technical Details

### Dependencies Used:
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Helper components (Environment, Lightformer)
- `@react-three/rapier` - Physics engine
- `meshline` - Smooth rope rendering
- `three` - 3D graphics library

### Physics Configuration:
- **Rope Joints**: Connect j1→j2→j3→card with fixed attachment
- **Damping**: Angular (4) and Linear (4) for natural movement
- **Colliders**: Ball colliders for joints, Cuboid for card
- **Kinematic Mode**: When dragging, card becomes kinematic

## 🎯 Next Steps

1. **Add your anime image**: Save it to `public/anime-card.jpg`
2. **Test dragging**: Click and drag the card in the browser
3. **Adjust physics**: Modify gravity or rope stiffness if needed
4. **Customize appearance**: Change colors, textures, or lighting

## 💡 Tips

- **Performance**: Component auto-adjusts quality for mobile
- **Interaction**: Card is draggable - cursor changes on hover
- **Rope Behavior**: Realistic stretching and bouncing
- **Environment**: Lightformers create realistic lighting

Enjoy your physics-based animated lanyard! 🎉
