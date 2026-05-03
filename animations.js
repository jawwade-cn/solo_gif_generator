// 情绪动画配置
const EmotionAnimations = {
    neutral: {
        name: '普通',
        duration: 1000,
        frames: 10,
        getFrame: (frame, totalFrames, components, size) => {
            return {
                offsetY: 0,
                offsetX: 0,
                scale: 1,
                eyeScale: 1,
                mouthScale: 1,
                showTears: false,
                showStars: false
            };
        }
    },
    
    happy: {
        name: '微笑',
        duration: 800,
        frames: 12,
        getFrame: (frame, totalFrames, components, size) => {
            const progress = frame / totalFrames;
            const bounce = Math.sin(progress * Math.PI * 2) * 0.05;
            
            return {
                offsetY: -bounce * size,
                offsetX: 0,
                scale: 1 + bounce * 0.3,
                eyeScale: 0.9,
                mouthScale: 1.2,
                showTears: false,
                showStars: false
            };
        }
    },
    
    angry: {
        name: '生气',
        duration: 600,
        frames: 10,
        getFrame: (frame, totalFrames, components, size) => {
            const progress = frame / totalFrames;
            const shake = Math.sin(progress * Math.PI * 4) * 0.03;
            
            return {
                offsetY: 0,
                offsetX: shake * size,
                scale: 1,
                eyeScale: 1.1,
                mouthScale: 1.3,
                showTears: false,
                showStars: false
            };
        }
    },
    
    sad: {
        name: '悲伤',
        duration: 1500,
        frames: 20,
        getFrame: (frame, totalFrames, components, size) => {
            const progress = frame / totalFrames;
            const tearProgress = (progress * 2) % 1;
            const slowBounce = Math.sin(progress * Math.PI) * 0.03;
            
            return {
                offsetY: slowBounce * size,
                offsetX: 0,
                scale: 1 - slowBounce * 0.2,
                eyeScale: 0.8,
                mouthScale: 0.9,
                showTears: true,
                tearProgress: tearProgress,
                showStars: false
            };
        }
    },
    
    stars: {
        name: '星星眼',
        duration: 1200,
        frames: 16,
        getFrame: (frame, totalFrames, components, size) => {
            const progress = frame / totalFrames;
            const sparkle = 0.8 + Math.sin(progress * Math.PI * 4) * 0.2;
            const bounce = Math.sin(progress * Math.PI * 2) * 0.04;
            
            return {
                offsetY: -bounce * size,
                offsetX: 0,
                scale: 1 + bounce * 0.2,
                eyeScale: sparkle,
                mouthScale: 1.1,
                showTears: false,
                showStars: true,
                starProgress: progress
            };
        }
    },
    
    wink: {
        name: '眨眼',
        duration: 1000,
        frames: 15,
        getFrame: (frame, totalFrames, components, size) => {
            const progress = frame / totalFrames;
            const winkProgress = Math.sin(progress * Math.PI * 2);
            const bounce = Math.sin(progress * Math.PI * 2) * 0.03;
            
            return {
                offsetY: -bounce * size,
                offsetX: 0,
                scale: 1 + bounce * 0.1,
                eyeScale: 1,
                leftEyeScale: winkProgress > 0.7 ? 0.1 : 1,
                rightEyeScale: 1,
                mouthScale: 1.1,
                showTears: false,
                showStars: false
            };
        }
    },
    
    laugh: {
        name: '大笑',
        duration: 700,
        frames: 12,
        getFrame: (frame, totalFrames, components, size) => {
            const progress = frame / totalFrames;
            const laughBounce = Math.abs(Math.sin(progress * Math.PI * 3)) * 0.05;
            const eyeSquint = 0.7 + Math.sin(progress * Math.PI * 2) * 0.2;
            
            return {
                offsetY: -laughBounce * size,
                offsetX: 0,
                scale: 1 + laughBounce * 0.3,
                eyeScale: eyeSquint,
                mouthScale: 1.4,
                showTears: false,
                showStars: false
            };
        }
    },
    
    shock: {
        name: '惊讶',
        duration: 1000,
        frames: 15,
        getFrame: (frame, totalFrames, components, size) => {
            const progress = frame / totalFrames;
            const widen = 1 + Math.sin(progress * Math.PI) * 0.3;
            const bounce = Math.sin(progress * Math.PI) * 0.03;
            
            return {
                offsetY: -bounce * size,
                offsetX: 0,
                scale: 1 + bounce * 0.2,
                eyeScale: widen,
                mouthScale: widen,
                showTears: false,
                showStars: false
            };
        }
    }
};

// 动画帧渲染函数
function renderAnimationFrame(ctx, frameData, components, size, centerX, centerY) {
    ctx.save();
    
    ctx.translate(centerX + frameData.offsetX, centerY + frameData.offsetY);
    ctx.scale(frameData.scale, frameData.scale);
    
    if (components.face) {
        components.face.draw(ctx, 0, 0, size);
    }
    
    if (components.eyes) {
        ctx.save();
        const eyeScale = frameData.eyeScale || 1;
        
        if (frameData.leftEyeScale !== undefined || frameData.rightEyeScale !== undefined) {
            const leftScale = frameData.leftEyeScale || eyeScale;
            const rightScale = frameData.rightEyeScale || eyeScale;
            
            const eyeSpacing = size * 0.25;
            const eyeY = -size * 0.1;
            const eyeSize = size * 0.08;
            
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.ellipse(-eyeSpacing, eyeY, eyeSize * leftScale, (eyeSize * 0.7) * leftScale, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#333333';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            if (leftScale > 0.3) {
                ctx.fillStyle = '#333333';
                ctx.beginPath();
                ctx.arc(-eyeSpacing, eyeY, (eyeSize * 0.5) * leftScale, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.ellipse(eyeSpacing, eyeY, eyeSize * rightScale, (eyeSize * 0.7) * rightScale, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#333333';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            if (rightScale > 0.3) {
                ctx.fillStyle = '#333333';
                ctx.beginPath();
                ctx.arc(eyeSpacing, eyeY, (eyeSize * 0.5) * rightScale, 0, Math.PI * 2);
                ctx.fill();
            }
        } else {
            ctx.scale(eyeScale, eyeScale);
            components.eyes.draw(ctx, 0, 0, size);
        }
        ctx.restore();
        
        if (frameData.showStars) {
            const starProgress = frameData.starProgress || 0;
            const starColors = ['#FFD700', '#FF69B4', '#00BFFF', '#9370DB'];
            
            for (let i = 0; i < 4; i++) {
                const angle = (i * Math.PI / 2) + starProgress * Math.PI * 2;
                const distance = size * 0.15 * (1 + Math.sin(starProgress * Math.PI * 2 + i));
                const starX = Math.cos(angle) * distance;
                const starY = Math.sin(angle) * distance - size * 0.1;
                const starSize = size * 0.03 * (0.5 + Math.sin(starProgress * Math.PI * 4 + i) * 0.5);
                
                ctx.fillStyle = starColors[i % starColors.length];
                drawStar(ctx, starX, starY, 5, starSize, starSize / 2);
            }
        }
    }
    
    if (components.nose) {
        components.nose.draw(ctx, 0, 0, size);
    }
    
    if (components.mouth) {
        ctx.save();
        const mouthScale = frameData.mouthScale || 1;
        ctx.scale(mouthScale, mouthScale);
        components.mouth.draw(ctx, 0, 0, size);
        ctx.restore();
    }
    
    if (components.glasses) {
        components.glasses.draw(ctx, 0, 0, size);
    }
    
    if (components.accessories) {
        components.accessories.draw(ctx, 0, 0, size);
    }
    
    if (frameData.showTears && frameData.tearProgress !== undefined) {
        const tearProgress = frameData.tearProgress;
        const tearY = -size * 0.05 + tearProgress * size * 0.3;
        
        ctx.fillStyle = '#87CEEB';
        ctx.beginPath();
        ctx.ellipse(-size * 0.25, tearY, size * 0.015, size * 0.03, 0, 0, Math.PI * 2);
        ctx.ellipse(size * 0.25, tearY, size * 0.015, size * 0.03, 0, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.restore();
}

// 绘制星星辅助函数
function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
}

// 获取动画配置
function getEmotionAnimation(emotion) {
    return EmotionAnimations[emotion] || EmotionAnimations.neutral;
}

// 生成动画帧数组
function generateAnimationFrames(components, emotion, size = 256) {
    const animation = getEmotionAnimation(emotion);
    const frames = [];
    
    for (let i = 0; i < animation.frames; i++) {
        frames.push(animation.getFrame(i, animation.frames, components, size));
    }
    
    return {
        frames,
        duration: animation.duration,
        frameCount: animation.frames
    };
}
