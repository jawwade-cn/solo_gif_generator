// 组件数据定义
const Components = {
    // 脸型选项
    faces: [
        {
            id: 'round',
            name: '圆脸',
            color: '#FFE5D4',
            draw: (ctx, x, y, size) => {
                ctx.fillStyle = '#FFE5D4';
                ctx.beginPath();
                ctx.arc(x, y, size * 0.4, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#E6C9B5';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        },
        {
            id: 'oval',
            name: '鹅蛋脸',
            color: '#FFDAB9',
            draw: (ctx, x, y, size) => {
                ctx.fillStyle = '#FFDAB9';
                ctx.beginPath();
                ctx.ellipse(x, y, size * 0.35, size * 0.45, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#E6C2A0';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        },
        {
            id: 'square',
            name: '方脸',
            color: '#FFE4B5',
            draw: (ctx, x, y, size) => {
                ctx.fillStyle = '#FFE4B5';
                const half = size * 0.35;
                const radius = size * 0.1;
                ctx.beginPath();
                ctx.moveTo(x - half + radius, y - half);
                ctx.lineTo(x + half - radius, y - half);
                ctx.quadraticCurveTo(x + half, y - half, x + half, y - half + radius);
                ctx.lineTo(x + half, y + half - radius);
                ctx.quadraticCurveTo(x + half, y + half, x + half - radius, y + half);
                ctx.lineTo(x - half + radius, y + half);
                ctx.quadraticCurveTo(x - half, y + half, x - half, y + half - radius);
                ctx.lineTo(x - half, y - half + radius);
                ctx.quadraticCurveTo(x - half, y - half, x - half + radius, y - half);
                ctx.closePath();
                ctx.fill();
                ctx.strokeStyle = '#E6C899';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        },
        {
            id: 'heart',
            name: '心形脸',
            color: '#FFE0BD',
            draw: (ctx, x, y, size) => {
                ctx.fillStyle = '#FFE0BD';
                ctx.beginPath();
                const topY = y - size * 0.4;
                const bottomY = y + size * 0.4;
                ctx.moveTo(x, bottomY);
                ctx.bezierCurveTo(
                    x - size * 0.3, bottomY - size * 0.2,
                    x - size * 0.4, topY + size * 0.1,
                    x - size * 0.2, topY
                );
                ctx.bezierCurveTo(
                    x, topY - size * 0.1,
                    x, topY - size * 0.1,
                    x + size * 0.2, topY
                );
                ctx.bezierCurveTo(
                    x + size * 0.4, topY + size * 0.1,
                    x + size * 0.3, bottomY - size * 0.2,
                    x, bottomY
                );
                ctx.closePath();
                ctx.fill();
                ctx.strokeStyle = '#E6C9AA';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        },
        {
            id: 'long',
            name: '长脸',
            color: '#FFE8D0',
            draw: (ctx, x, y, size) => {
                ctx.fillStyle = '#FFE8D0';
                ctx.beginPath();
                const halfW = size * 0.3;
                const halfH = size * 0.5;
                const radius = size * 0.15;
                
                ctx.moveTo(x - halfW, y - halfH + radius);
                ctx.quadraticCurveTo(x - halfW, y - halfH, x - halfW + radius, y - halfH);
                ctx.lineTo(x + halfW - radius, y - halfH);
                ctx.quadraticCurveTo(x + halfW, y - halfH, x + halfW, y - halfH + radius);
                ctx.lineTo(x + halfW, y + halfH - radius);
                ctx.quadraticCurveTo(x + halfW, y + halfH, x + halfW - radius, y + halfH);
                ctx.lineTo(x - halfW + radius, y + halfH);
                ctx.quadraticCurveTo(x - halfW, y + halfH, x - halfW, y + halfH - radius);
                ctx.closePath();
                ctx.fill();
                ctx.strokeStyle = '#E6D0B5';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }
    ],

    // 眼睛选项
    eyes: [
        {
            id: 'normal',
            name: '普通眼',
            draw: (ctx, x, y, size, emotion = 'neutral') => {
                const eyeSize = size * 0.08;
                const eyeSpacing = size * 0.25;
                
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.ellipse(x - eyeSpacing, y - size * 0.1, eyeSize, eyeSize * 0.7, 0, 0, Math.PI * 2);
                ctx.ellipse(x + eyeSpacing, y - size * 0.1, eyeSize, eyeSize * 0.7, 0, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.strokeStyle = '#333333';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                ctx.fillStyle = '#333333';
                ctx.beginPath();
                ctx.arc(x - eyeSpacing, y - size * 0.1, eyeSize * 0.5, 0, Math.PI * 2);
                ctx.arc(x + eyeSpacing, y - size * 0.1, eyeSize * 0.5, 0, Math.PI * 2);
                ctx.fill();
            }
        },
        {
            id: 'big',
            name: '大眼睛',
            draw: (ctx, x, y, size, emotion = 'neutral') => {
                const eyeSize = size * 0.12;
                const eyeSpacing = size * 0.25;
                
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.arc(x - eyeSpacing, y - size * 0.12, eyeSize, 0, Math.PI * 2);
                ctx.arc(x + eyeSpacing, y - size * 0.12, eyeSize, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.strokeStyle = '#333333';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                ctx.fillStyle = '#6A5ACD';
                ctx.beginPath();
                ctx.arc(x - eyeSpacing, y - size * 0.12, eyeSize * 0.6, 0, Math.PI * 2);
                ctx.arc(x + eyeSpacing, y - size * 0.12, eyeSize * 0.6, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.arc(x - eyeSpacing + eyeSize * 0.2, y - size * 0.14, eyeSize * 0.2, 0, Math.PI * 2);
                ctx.arc(x + eyeSpacing + eyeSize * 0.2, y - size * 0.14, eyeSize * 0.2, 0, Math.PI * 2);
                ctx.fill();
            }
        },
        {
            id: 'slanted',
            name: '凤眼',
            draw: (ctx, x, y, size, emotion = 'neutral') => {
                const eyeWidth = size * 0.15;
                const eyeHeight = size * 0.08;
                const eyeSpacing = size * 0.25;
                
                ctx.fillStyle = '#FFFFFF';
                
                ctx.beginPath();
                ctx.moveTo(x - eyeSpacing - eyeWidth, y - size * 0.1 + eyeHeight * 0.5);
                ctx.quadraticCurveTo(
                    x - eyeSpacing, y - size * 0.1 - eyeHeight,
                    x - eyeSpacing + eyeWidth, y - size * 0.1 + eyeHeight * 0.3
                );
                ctx.quadraticCurveTo(
                    x - eyeSpacing, y - size * 0.1 + eyeHeight,
                    x - eyeSpacing - eyeWidth, y - size * 0.1 + eyeHeight * 0.5
                );
                ctx.fill();
                
                ctx.beginPath();
                ctx.moveTo(x + eyeSpacing + eyeWidth, y - size * 0.1 + eyeHeight * 0.5);
                ctx.quadraticCurveTo(
                    x + eyeSpacing, y - size * 0.1 - eyeHeight,
                    x + eyeSpacing - eyeWidth, y - size * 0.1 + eyeHeight * 0.3
                );
                ctx.quadraticCurveTo(
                    x + eyeSpacing, y - size * 0.1 + eyeHeight,
                    x + eyeSpacing + eyeWidth, y - size * 0.1 + eyeHeight * 0.5
                );
                ctx.fill();
                
                ctx.strokeStyle = '#333333';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                ctx.fillStyle = '#333333';
                ctx.beginPath();
                ctx.ellipse(x - eyeSpacing, y - size * 0.08, eyeHeight * 0.5, eyeHeight * 0.4, 0, 0, Math.PI * 2);
                ctx.ellipse(x + eyeSpacing, y - size * 0.08, eyeHeight * 0.5, eyeHeight * 0.4, 0, 0, Math.PI * 2);
                ctx.fill();
            }
        },
        {
            id: 'closed',
            name: '眯眯眼',
            draw: (ctx, x, y, size, emotion = 'neutral') => {
                const eyeSpacing = size * 0.25;
                
                ctx.strokeStyle = '#333333';
                ctx.lineWidth = 3;
                ctx.lineCap = 'round';
                
                ctx.beginPath();
                ctx.moveTo(x - eyeSpacing - size * 0.08, y - size * 0.1);
                ctx.quadraticCurveTo(
                    x - eyeSpacing, y - size * 0.05,
                    x - eyeSpacing + size * 0.08, y - size * 0.1
                );
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(x + eyeSpacing - size * 0.08, y - size * 0.1);
                ctx.quadraticCurveTo(
                    x + eyeSpacing, y - size * 0.05,
                    x + eyeSpacing + size * 0.08, y - size * 0.1
                );
                ctx.stroke();
            }
        },
        {
            id: 'sleepy',
            name: '睡眼',
            draw: (ctx, x, y, size, emotion = 'neutral') => {
                const eyeSize = size * 0.08;
                const eyeSpacing = size * 0.25;
                
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.ellipse(x - eyeSpacing, y - size * 0.08, eyeSize, eyeSize * 0.4, 0, 0, Math.PI * 2);
                ctx.ellipse(x + eyeSpacing, y - size * 0.08, eyeSize, eyeSize * 0.4, 0, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.strokeStyle = '#333333';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                ctx.fillStyle = '#333333';
                ctx.beginPath();
                ctx.arc(x - eyeSpacing, y - size * 0.06, eyeSize * 0.3, 0, Math.PI * 2);
                ctx.arc(x + eyeSpacing, y - size * 0.06, eyeSize * 0.3, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    ],

    // 鼻子选项
    noses: [
        {
            id: 'simple',
            name: '简单鼻',
            draw: (ctx, x, y, size, emotion = 'neutral') => {
                ctx.strokeStyle = '#D4A574';
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                
                ctx.beginPath();
                ctx.moveTo(x, y - size * 0.02);
                ctx.quadraticCurveTo(
                    x + size * 0.03, y + size * 0.05,
                    x, y + size * 0.08
                );
                ctx.stroke();
            }
        },
        {
            id: 'button',
            name: '按钮鼻',
            draw: (ctx, x, y, size, emotion = 'neutral') => {
                ctx.fillStyle = '#FFB6C1';
                ctx.beginPath();
                ctx.arc(x, y + size * 0.05, size * 0.05, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.strokeStyle = '#D4A574';
                ctx.lineWidth = 1.5;
                ctx.stroke();
                
                ctx.fillStyle = '#333333';
                ctx.beginPath();
                ctx.arc(x - size * 0.02, y + size * 0.05, size * 0.015, 0, Math.PI * 2);
                ctx.arc(x + size * 0.02, y + size * 0.05, size * 0.015, 0, Math.PI * 2);
                ctx.fill();
            }
        },
        {
            id: 'pointed',
            name: '尖鼻',
            draw: (ctx, x, y, size, emotion = 'neutral') => {
                ctx.strokeStyle = '#D4A574';
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                
                ctx.beginPath();
                ctx.moveTo(x, y - size * 0.05);
                ctx.lineTo(x, y + size * 0.08);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(x - size * 0.04, y + size * 0.04);
                ctx.lineTo(x, y + size * 0.08);
                ctx.lineTo(x + size * 0.04, y + size * 0.04);
                ctx.stroke();
            }
        },
        {
            id: 'round',
            name: '圆鼻',
            draw: (ctx, x, y, size, emotion = 'neutral') => {
                ctx.fillStyle = '#FFE4D0';
                ctx.beginPath();
                ctx.arc(x, y + size * 0.04, size * 0.06, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.strokeStyle = '#D4A574';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        },
        {
            id: 'tiny',
            name: '小鼻',
            draw: (ctx, x, y, size, emotion = 'neutral') => {
                ctx.fillStyle = '#D4A574';
                ctx.beginPath();
                ctx.arc(x, y + size * 0.05, size * 0.03, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    ],

    // 嘴巴选项（基础形状，不带情绪）
    mouths: [
        {
            id: 'standard',
            name: '标准唇',
            draw: (ctx, x, y, size) => {
                ctx.strokeStyle = '#DC143C';
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                
                const mouthWidth = size * 0.12;
                const mouthY = y + size * 0.15;
                
                ctx.beginPath();
                ctx.arc(x, mouthY, mouthWidth, 0.15 * Math.PI, 0.85 * Math.PI);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.arc(x, mouthY + size * 0.02, mouthWidth * 0.9, 1.15 * Math.PI, 1.85 * Math.PI);
                ctx.stroke();
            }
        },
        {
            id: 'thin',
            name: '薄唇',
            draw: (ctx, x, y, size) => {
                ctx.strokeStyle = '#DC143C';
                ctx.lineWidth = 1.5;
                ctx.lineCap = 'round';
                
                const mouthWidth = size * 0.14;
                const mouthY = y + size * 0.15;
                
                ctx.beginPath();
                ctx.moveTo(x - mouthWidth, mouthY);
                ctx.quadraticCurveTo(x, mouthY + size * 0.02, x + mouthWidth, mouthY);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(x - mouthWidth * 0.8, mouthY + size * 0.03);
                ctx.quadraticCurveTo(x, mouthY + size * 0.06, x + mouthWidth * 0.8, mouthY + size * 0.03);
                ctx.stroke();
            }
        },
        {
            id: 'thick',
            name: '厚唇',
            draw: (ctx, x, y, size) => {
                ctx.fillStyle = '#FF69B4';
                
                const mouthWidth = size * 0.13;
                const mouthY = y + size * 0.14;
                
                ctx.beginPath();
                ctx.ellipse(x, mouthY, mouthWidth, size * 0.04, 0, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.beginPath();
                ctx.ellipse(x, mouthY + size * 0.05, mouthWidth * 0.9, size * 0.05, 0, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.strokeStyle = '#DC143C';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(x - mouthWidth, mouthY);
                ctx.quadraticCurveTo(x, mouthY + size * 0.01, x + mouthWidth, mouthY);
                ctx.stroke();
            }
        },
        {
            id: 'small',
            name: '小嘴唇',
            draw: (ctx, x, y, size) => {
                ctx.strokeStyle = '#DC143C';
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                
                const mouthWidth = size * 0.08;
                const mouthY = y + size * 0.16;
                
                ctx.beginPath();
                ctx.arc(x, mouthY, mouthWidth, 0.2 * Math.PI, 0.8 * Math.PI);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.arc(x, mouthY + size * 0.02, mouthWidth * 0.85, 1.2 * Math.PI, 1.8 * Math.PI);
                ctx.stroke();
            }
        },
        {
            id: 'wide',
            name: '宽嘴唇',
            draw: (ctx, x, y, size) => {
                ctx.strokeStyle = '#DC143C';
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                
                const mouthWidth = size * 0.18;
                const mouthY = y + size * 0.15;
                
                ctx.beginPath();
                ctx.moveTo(x - mouthWidth, mouthY);
                ctx.quadraticCurveTo(x - mouthWidth * 0.5, mouthY + size * 0.03, x, mouthY + size * 0.02);
                ctx.quadraticCurveTo(x + mouthWidth * 0.5, mouthY + size * 0.03, x + mouthWidth, mouthY);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(x - mouthWidth * 0.85, mouthY + size * 0.03);
                ctx.quadraticCurveTo(x, mouthY + size * 0.08, x + mouthWidth * 0.85, mouthY + size * 0.03);
                ctx.stroke();
            }
        }
    ],

    // 眼镜选项
    glasses: [
        {
            id: 'none',
            name: '无',
            draw: (ctx, x, y, size) => {
                // 不绘制任何东西
            }
        },
        {
            id: 'round',
            name: '圆框眼镜',
            draw: (ctx, x, y, size) => {
                const eyeSpacing = size * 0.25;
                const lensSize = size * 0.12;
                
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = 3;
                
                ctx.beginPath();
                ctx.arc(x - eyeSpacing, y - size * 0.1, lensSize, 0, Math.PI * 2);
                ctx.arc(x + eyeSpacing, y - size * 0.1, lensSize, 0, Math.PI * 2);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(x - eyeSpacing + lensSize, y - size * 0.1);
                ctx.lineTo(x + eyeSpacing - lensSize, y - size * 0.1);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(x - eyeSpacing - lensSize, y - size * 0.1);
                ctx.lineTo(x - eyeSpacing - lensSize - size * 0.08, y - size * 0.12);
                ctx.moveTo(x + eyeSpacing + lensSize, y - size * 0.1);
                ctx.lineTo(x + eyeSpacing + lensSize + size * 0.08, y - size * 0.12);
                ctx.stroke();
            }
        },
        {
            id: 'square',
            name: '方框眼镜',
            draw: (ctx, x, y, size) => {
                const eyeSpacing = size * 0.25;
                const lensWidth = size * 0.1;
                const lensHeight = size * 0.08;
                
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = 3;
                
                ctx.strokeRect(x - eyeSpacing - lensWidth, y - size * 0.1 - lensHeight, lensWidth * 2, lensHeight * 2);
                ctx.strokeRect(x + eyeSpacing - lensWidth, y - size * 0.1 - lensHeight, lensWidth * 2, lensHeight * 2);
                
                ctx.beginPath();
                ctx.moveTo(x - eyeSpacing + lensWidth, y - size * 0.1);
                ctx.lineTo(x + eyeSpacing - lensWidth, y - size * 0.1);
                ctx.stroke();
            }
        },
        {
            id: 'sunglasses',
            name: '墨镜',
            draw: (ctx, x, y, size) => {
                const eyeSpacing = size * 0.25;
                const lensSize = size * 0.12;
                
                ctx.fillStyle = '#1a1a2e';
                ctx.beginPath();
                ctx.ellipse(x - eyeSpacing, y - size * 0.1, lensSize, lensSize * 0.7, 0, 0, Math.PI * 2);
                ctx.ellipse(x + eyeSpacing, y - size * 0.1, lensSize, lensSize * 0.7, 0, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(x - eyeSpacing + lensSize, y - size * 0.1);
                ctx.lineTo(x + eyeSpacing - lensSize, y - size * 0.1);
                ctx.stroke();
                
                ctx.strokeStyle = '#FFD700';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x - eyeSpacing - lensSize, y - size * 0.1);
                ctx.lineTo(x - eyeSpacing - lensSize - size * 0.08, y - size * 0.12);
                ctx.moveTo(x + eyeSpacing + lensSize, y - size * 0.1);
                ctx.lineTo(x + eyeSpacing + lensSize + size * 0.08, y - size * 0.12);
                ctx.stroke();
            }
        },
        {
            id: 'catEye',
            name: '猫眼眼镜',
            draw: (ctx, x, y, size) => {
                const eyeSpacing = size * 0.25;
                const lensSize = size * 0.1;
                
                ctx.strokeStyle = '#8B0000';
                ctx.lineWidth = 3;
                
                ctx.beginPath();
                ctx.moveTo(x - eyeSpacing - lensSize, y - size * 0.1);
                ctx.quadraticCurveTo(x - eyeSpacing - lensSize, y - size * 0.2, x - eyeSpacing, y - size * 0.2);
                ctx.quadraticCurveTo(x - eyeSpacing + lensSize, y - size * 0.2, x - eyeSpacing + lensSize, y - size * 0.1);
                ctx.quadraticCurveTo(x - eyeSpacing, y - size * 0.05, x - eyeSpacing - lensSize, y - size * 0.1);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(x + eyeSpacing + lensSize, y - size * 0.1);
                ctx.quadraticCurveTo(x + eyeSpacing + lensSize, y - size * 0.2, x + eyeSpacing, y - size * 0.2);
                ctx.quadraticCurveTo(x + eyeSpacing - lensSize, y - size * 0.2, x + eyeSpacing - lensSize, y - size * 0.1);
                ctx.quadraticCurveTo(x + eyeSpacing, y - size * 0.05, x + eyeSpacing + lensSize, y - size * 0.1);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(x - eyeSpacing + lensSize, y - size * 0.1);
                ctx.lineTo(x + eyeSpacing - lensSize, y - size * 0.1);
                ctx.stroke();
            }
        }
    ],

    // 配饰选项
    accessories: [
        {
            id: 'none',
            name: '无',
            draw: (ctx, x, y, size) => {
                // 不绘制任何东西
            }
        },
        {
            id: 'necklace',
            name: '项链',
            draw: (ctx, x, y, size) => {
                ctx.strokeStyle = '#FFD700';
                ctx.lineWidth = 2;
                
                ctx.beginPath();
                ctx.arc(x, y + size * 0.45, size * 0.25, Math.PI * 0.2, Math.PI * 0.8);
                ctx.stroke();
                
                ctx.fillStyle = '#FF0000';
                ctx.beginPath();
                ctx.arc(x, y + size * 0.55, size * 0.05, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.strokeStyle = '#FFD700';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        },
        {
            id: 'earrings',
            name: '耳环',
            draw: (ctx, x, y, size) => {
                ctx.strokeStyle = '#C0C0C0';
                ctx.lineWidth = 2;
                
                ctx.beginPath();
                ctx.moveTo(x - size * 0.35, y - size * 0.15);
                ctx.lineTo(x - size * 0.35, y - size * 0.05);
                ctx.stroke();
                
                ctx.fillStyle = '#87CEEB';
                ctx.beginPath();
                ctx.arc(x - size * 0.35, y, size * 0.04, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.strokeStyle = '#C0C0C0';
                ctx.beginPath();
                ctx.moveTo(x + size * 0.35, y - size * 0.15);
                ctx.lineTo(x + size * 0.35, y - size * 0.05);
                ctx.stroke();
                
                ctx.fillStyle = '#87CEEB';
                ctx.beginPath();
                ctx.arc(x + size * 0.35, y, size * 0.04, 0, Math.PI * 2);
                ctx.fill();
            }
        },
        {
            id: 'hat',
            name: '帽子',
            draw: (ctx, x, y, size) => {
                ctx.fillStyle = '#8B4513';
                
                ctx.beginPath();
                ctx.ellipse(x, y - size * 0.45, size * 0.4, size * 0.1, 0, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.beginPath();
                ctx.arc(x, y - size * 0.5, size * 0.2, Math.PI, 0);
                ctx.lineTo(x + size * 0.2, y - size * 0.45);
                ctx.lineTo(x - size * 0.2, y - size * 0.45);
                ctx.closePath();
                ctx.fill();
                
                ctx.fillStyle = '#FF0000';
                ctx.fillRect(x - size * 0.2, y - size * 0.48, size * 0.4, size * 0.03);
            }
        },
        {
            id: 'bow',
            name: '蝴蝶结',
            draw: (ctx, x, y, size) => {
                ctx.fillStyle = '#FF69B4';
                
                ctx.beginPath();
                ctx.ellipse(x - size * 0.08, y - size * 0.35, size * 0.08, size * 0.05, -0.5, 0, Math.PI * 2);
                ctx.ellipse(x + size * 0.08, y - size * 0.35, size * 0.08, size * 0.05, 0.5, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = '#FF1493';
                ctx.beginPath();
                ctx.arc(x, y - size * 0.35, size * 0.03, 0, Math.PI * 2);
                ctx.fill();
            }
        },
        {
            id: 'headphones',
            name: '耳机',
            draw: (ctx, x, y, size) => {
                ctx.strokeStyle = '#333333';
                ctx.lineWidth = 4;
                
                ctx.beginPath();
                ctx.arc(x, y - size * 0.3, size * 0.35, Math.PI * 0.8, Math.PI * 0.2);
                ctx.stroke();
                
                ctx.fillStyle = '#333333';
                ctx.beginPath();
                ctx.ellipse(x - size * 0.35, y - size * 0.2, size * 0.06, size * 0.1, Math.PI * 0.2, 0, Math.PI * 2);
                ctx.ellipse(x + size * 0.35, y - size * 0.2, size * 0.06, size * 0.1, -Math.PI * 0.2, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = '#666666';
                ctx.beginPath();
                ctx.ellipse(x - size * 0.33, y - size * 0.2, size * 0.03, size * 0.06, Math.PI * 0.2, 0, Math.PI * 2);
                ctx.ellipse(x + size * 0.33, y - size * 0.2, size * 0.03, size * 0.06, -Math.PI * 0.2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    ]
};

// 获取组件列表
function getComponentOptions(type) {
    switch(type) {
        case 'face':
            return Components.faces;
        case 'eyes':
            return Components.eyes;
        case 'nose':
            return Components.noses;
        case 'mouth':
            return Components.mouths;
        case 'glasses':
            return Components.glasses;
        case 'accessories':
            return Components.accessories;
        default:
            return [];
    }
}

// 根据ID获取组件
function getComponentById(type, id) {
    const components = getComponentOptions(type);
    return components.find(c => c.id === id) || null;
}
