// 主应用逻辑
class GifEmojiApp {
    constructor() {
        this.selectedComponents = {
            face: null,
            eyes: null,
            nose: null,
            mouth: null,
            glasses: null,
            accessories: null
        };
        
        this.currentEmotion = 'neutral';
        this.animationSpeed = 150;
        this.isAnimating = false;
        this.animationInterval = null;
        this.currentFrame = 0;
        
        this.previewCanvas = null;
        this.previewCtx = null;
        this.gifCanvas = null;
        this.gifCtx = null;
        
        this.init();
    }
    
    init() {
        this.setupCanvases();
        this.setupEventListeners();
        this.renderComponentOptions('face');
        this.setDefaultSelections();
        this.renderPreview();
    }
    
    setupCanvases() {
        this.gifCanvas = document.getElementById('gif-canvas');
        if (this.gifCanvas) {
            this.gifCtx = this.gifCanvas.getContext('2d');
        }
        
        const previewContainer = document.getElementById('emoji-preview');
        if (previewContainer) {
            this.previewCanvas = document.createElement('canvas');
            this.previewCanvas.width = 256;
            this.previewCanvas.height = 256;
            this.previewCanvas.style.width = '100%';
            this.previewCanvas.style.height = '100%';
            
            const placeholder = previewContainer.querySelector('.text-gray-400');
            if (placeholder) {
                placeholder.remove();
            }
            previewContainer.appendChild(this.previewCanvas);
            
            this.previewCtx = this.previewCanvas.getContext('2d');
        }
    }
    
    setupEventListeners() {
        const componentTabs = document.querySelectorAll('.component-tab');
        componentTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchComponentTab(e.target.dataset.component);
            });
        });
        
        const emotionBtns = document.querySelectorAll('.emotion-btn');
        emotionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setEmotion(e.target.closest('.emotion-btn').dataset.emotion);
            });
        });
        
        const speedSlider = document.getElementById('speed-slider');
        if (speedSlider) {
            speedSlider.addEventListener('input', (e) => {
                this.animationSpeed = parseInt(e.target.value);
                if (this.isAnimating) {
                    this.restartAnimation();
                }
            });
        }
        
        const playBtn = document.getElementById('play-animation');
        if (playBtn) {
            playBtn.addEventListener('click', () => this.toggleAnimation());
        }
        
        const randomizeBtn = document.getElementById('randomize');
        if (randomizeBtn) {
            randomizeBtn.addEventListener('click', () => this.randomizeComponents());
        }
        
        const generateBtn = document.getElementById('generate-gif');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateAndDownloadGif());
        }
        
        const resetBtn = document.getElementById('reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetSelections());
        }
    }
    
    switchComponentTab(componentType) {
        const tabs = document.querySelectorAll('.component-tab');
        tabs.forEach(tab => {
            tab.classList.remove('active', 'bg-purple-600', 'text-white');
            tab.classList.add('bg-gray-200', 'text-gray-700');
        });
        
        const activeTab = document.querySelector(`.component-tab[data-component="${componentType}"]`);
        if (activeTab) {
            activeTab.classList.add('active', 'bg-purple-600', 'text-white');
            activeTab.classList.remove('bg-gray-200', 'text-gray-700');
        }
        
        this.renderComponentOptions(componentType);
    }
    
    renderComponentOptions(componentType) {
        const container = document.getElementById('component-options');
        if (!container) return;
        
        container.innerHTML = '';
        
        const components = getComponentOptions(componentType);
        
        components.forEach(component => {
            const option = document.createElement('div');
            option.className = 'component-option p-3 bg-gray-50 rounded-lg text-center cursor-pointer transition';
            option.dataset.componentId = component.id;
            option.dataset.componentType = componentType;
            
            const previewCanvas = document.createElement('canvas');
            previewCanvas.width = 64;
            previewCanvas.height = 64;
            previewCanvas.className = 'mx-auto mb-2';
            this.renderComponentPreview(previewCanvas, componentType, component);
            
            const name = document.createElement('div');
            name.className = 'text-xs font-medium text-gray-700';
            name.textContent = component.name;
            
            option.appendChild(previewCanvas);
            option.appendChild(name);
            
            if (this.selectedComponents[componentType] && 
                this.selectedComponents[componentType].id === component.id) {
                option.classList.add('selected');
            }
            
            option.addEventListener('click', () => {
                this.selectComponent(componentType, component);
            });
            
            container.appendChild(option);
        });
    }
    
    renderComponentPreview(canvas, componentType, component) {
        const ctx = canvas.getContext('2d');
        const size = 64;
        const centerX = size / 2;
        const centerY = size / 2;
        
        ctx.clearRect(0, 0, size, size);
        ctx.fillStyle = '#F3F4F6';
        ctx.fillRect(0, 0, size, size);
        
        if (componentType === 'face') {
            component.draw(ctx, centerX, centerY, size);
        } else if (componentType === 'eyes') {
            ctx.fillStyle = '#FFE5D4';
            ctx.beginPath();
            ctx.arc(centerX, centerY, size * 0.35, 0, Math.PI * 2);
            ctx.fill();
            component.draw(ctx, centerX, centerY, size);
        } else if (componentType === 'nose') {
            ctx.fillStyle = '#FFE5D4';
            ctx.beginPath();
            ctx.arc(centerX, centerY, size * 0.35, 0, Math.PI * 2);
            ctx.fill();
            component.draw(ctx, centerX, centerY, size);
        } else if (componentType === 'mouth') {
            ctx.fillStyle = '#FFE5D4';
            ctx.beginPath();
            ctx.arc(centerX, centerY, size * 0.35, 0, Math.PI * 2);
            ctx.fill();
            component.draw(ctx, centerX, centerY, size);
        } else if (componentType === 'glasses') {
            ctx.fillStyle = '#FFE5D4';
            ctx.beginPath();
            ctx.arc(centerX, centerY, size * 0.35, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.ellipse(centerX - size * 0.15, centerY - size * 0.08, size * 0.08, size * 0.06, 0, 0, Math.PI * 2);
            ctx.ellipse(centerX + size * 0.15, centerY - size * 0.08, size * 0.08, size * 0.06, 0, 0, Math.PI * 2);
            ctx.fill();
            
            component.draw(ctx, centerX, centerY, size);
        } else if (componentType === 'accessories') {
            ctx.fillStyle = '#FFE5D4';
            ctx.beginPath();
            ctx.arc(centerX, centerY, size * 0.35, 0, Math.PI * 2);
            ctx.fill();
            component.draw(ctx, centerX, centerY, size);
        }
    }
    
    selectComponent(componentType, component) {
        this.selectedComponents[componentType] = component;
        
        const options = document.querySelectorAll('.component-option');
        options.forEach(opt => {
            if (opt.dataset.componentType === componentType) {
                opt.classList.remove('selected');
                if (opt.dataset.componentId === component.id) {
                    opt.classList.add('selected');
                }
            }
        });
        
        this.renderPreview();
    }
    
    setDefaultSelections() {
        const faces = getComponentOptions('face');
        const eyes = getComponentOptions('eyes');
        const noses = getComponentOptions('nose');
        const mouths = getComponentOptions('mouth');
        const glasses = getComponentOptions('glasses');
        const accessories = getComponentOptions('accessories');
        
        if (faces.length > 0) this.selectedComponents.face = faces[0];
        if (eyes.length > 0) this.selectedComponents.eyes = eyes[0];
        if (noses.length > 0) this.selectedComponents.nose = noses[0];
        if (mouths.length > 0) this.selectedComponents.mouth = mouths[0];
        if (glasses.length > 0) this.selectedComponents.glasses = glasses[0];
        if (accessories.length > 0) this.selectedComponents.accessories = accessories[0];
    }
    
    setEmotion(emotion) {
        this.currentEmotion = emotion;
        
        const btns = document.querySelectorAll('.emotion-btn');
        btns.forEach(btn => {
            btn.classList.remove('active', 'bg-purple-100', 'border-purple-500');
            btn.classList.add('bg-gray-100', 'border-gray-200');
        });
        
        const activeBtn = document.querySelector(`.emotion-btn[data-emotion="${emotion}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active', 'bg-purple-100', 'border-purple-500');
            activeBtn.classList.remove('bg-gray-100', 'border-gray-200');
        }
        
        if (this.isAnimating) {
            this.restartAnimation();
        } else {
            this.renderPreview();
        }
    }
    
    renderPreview() {
        if (!this.previewCtx) return;
        
        const size = 256;
        const centerX = size / 2;
        const centerY = size / 2;
        
        this.previewCtx.clearRect(0, 0, size, size);
        this.previewCtx.fillStyle = '#F9FAFB';
        this.previewCtx.fillRect(0, 0, size, size);
        
        const frameData = {
            emotion: this.currentEmotion,
            offsetY: 0,
            offsetX: 0,
            scale: 1,
            eyeScale: 1,
            mouthScale: 1,
            showTears: false,
            showStars: false
        };
        
        renderAnimationFrame(
            this.previewCtx, 
            frameData, 
            this.selectedComponents, 
            size, 
            centerX, 
            centerY
        );
    }
    
    toggleAnimation() {
        if (this.isAnimating) {
            this.stopAnimation();
        } else {
            this.startAnimation();
        }
    }
    
    startAnimation() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.currentFrame = 0;
        
        const animationData = generateAnimationFrames(
            this.selectedComponents,
            this.currentEmotion,
            256
        );
        
        const playBtn = document.getElementById('play-animation');
        if (playBtn) {
            playBtn.innerHTML = '<span class="mr-2">⏸️</span> 暂停动画';
        }
        
        const size = 256;
        const centerX = size / 2;
        const centerY = size / 2;
        
        this.animationInterval = setInterval(() => {
            if (this.currentFrame >= animationData.frames.length) {
                this.currentFrame = 0;
            }
            
            const frameData = animationData.frames[this.currentFrame];
            
            this.previewCtx.clearRect(0, 0, size, size);
            this.previewCtx.fillStyle = '#F9FAFB';
            this.previewCtx.fillRect(0, 0, size, size);
            
            renderAnimationFrame(
                this.previewCtx,
                frameData,
                this.selectedComponents,
                size,
                centerX,
                centerY
            );
            
            this.currentFrame++;
        }, this.animationSpeed);
    }
    
    stopAnimation() {
        this.isAnimating = false;
        
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
        
        const playBtn = document.getElementById('play-animation');
        if (playBtn) {
            playBtn.innerHTML = '<span class="mr-2">▶️</span> 播放动画';
        }
        
        this.renderPreview();
    }
    
    restartAnimation() {
        if (this.isAnimating) {
            this.stopAnimation();
            setTimeout(() => this.startAnimation(), 100);
        }
    }
    
    randomizeComponents() {
        const componentTypes = ['face', 'eyes', 'nose', 'mouth', 'glasses', 'accessories'];
        
        componentTypes.forEach(type => {
            const options = getComponentOptions(type);
            if (options.length > 0) {
                const randomIndex = Math.floor(Math.random() * options.length);
                this.selectedComponents[type] = options[randomIndex];
            }
        });
        
        const emotions = ['neutral', 'happy', 'angry', 'sad', 'stars', 'wink', 'laugh', 'shock'];
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        this.setEmotion(randomEmotion);
        
        this.renderComponentOptions('face');
        this.renderPreview();
    }
    
    resetSelections() {
        this.stopAnimation();
        this.setDefaultSelections();
        this.currentEmotion = 'neutral';
        this.animationSpeed = 150;
        
        const speedSlider = document.getElementById('speed-slider');
        if (speedSlider) {
            speedSlider.value = 150;
        }
        
        this.setEmotion('neutral');
        this.renderComponentOptions('face');
        this.renderPreview();
    }
    
    async generateAndDownloadGif() {
        if (typeof GIF === 'undefined') {
            alert('GIF生成库加载失败，请刷新页面重试');
            return;
        }
        
        const progressContainer = document.getElementById('progress-container');
        const progressBar = document.getElementById('progress-bar');
        const generateBtn = document.getElementById('generate-gif');
        
        if (progressContainer) {
            progressContainer.classList.remove('hidden');
        }
        if (progressBar) {
            progressBar.style.width = '0%';
        }
        if (generateBtn) {
            generateBtn.disabled = true;
            generateBtn.innerHTML = '<span class="loading-spinner"></span> 生成中...';
        }
        
        try {
            const animationData = generateAnimationFrames(
                this.selectedComponents,
                this.currentEmotion,
                256
            );
            
            const frameDuration = Math.max(50, this.animationSpeed);
            
            const gif = new GIF({
                workers: 0,
                quality: 10,
                width: 256,
                height: 256
            });
            
            const size = 256;
            const centerX = size / 2;
            const centerY = size / 2;
            
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = 256;
            tempCanvas.height = 256;
            const tempCtx = tempCanvas.getContext('2d');
            
            for (let i = 0; i < animationData.frames.length; i++) {
                tempCtx.clearRect(0, 0, size, size);
                tempCtx.fillStyle = '#F9FAFB';
                tempCtx.fillRect(0, 0, size, size);
                
                renderAnimationFrame(
                    tempCtx,
                    animationData.frames[i],
                    this.selectedComponents,
                    size,
                    centerX,
                    centerY
                );
                
                gif.addFrame(tempCtx, { copy: true, delay: frameDuration });
                
                if (progressBar) {
                    const progress = ((i + 1) / animationData.frames.length) * 50;
                    progressBar.style.width = `${progress}%`;
                }
                
                await new Promise(resolve => setTimeout(resolve, 30));
            }
            
            let renderFinished = false;
            let renderError = null;
            
            gif.on('progress', (p) => {
                if (progressBar) {
                    const progress = 50 + p * 50;
                    progressBar.style.width = `${progress}%`;
                }
            });
            
            gif.on('finished', (blob) => {
                renderFinished = true;
                
                const url = URL.createObjectURL(blob);
                
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
                const fileName = `emoji_${this.currentEmotion}_${timestamp}.gif`;
                
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                setTimeout(() => URL.revokeObjectURL(url), 100);
                
                if (progressContainer) {
                    setTimeout(() => {
                        progressContainer.classList.add('hidden');
                    }, 500);
                }
                
                if (generateBtn) {
                    generateBtn.disabled = false;
                    generateBtn.innerHTML = '<span class="mr-2">💾</span> 生成并下载GIF';
                }
            });
            
            gif.on('abort', () => {
                renderError = new Error('GIF渲染被中止');
            });
            
            try {
                gif.render();
            } catch (e) {
                renderError = e;
            }
            
            if (renderError) {
                throw renderError;
            }
            
        } catch (error) {
            console.error('GIF生成错误:', error);
            alert('GIF生成失败: ' + (error.message || '未知错误') + '\n请重试或刷新页面');
            
            if (progressContainer) {
                progressContainer.classList.add('hidden');
            }
            if (generateBtn) {
                generateBtn.disabled = false;
                generateBtn.innerHTML = '<span class="mr-2">💾</span> 生成并下载GIF';
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.gifEmojiApp = new GifEmojiApp();
});
