document.addEventListener('DOMContentLoaded', () => {

            const cartDrawer = document.getElementById("cart-drawer");
            const openCartBtn = document.getElementById("cart-open");
            const closeCartBtn = document.getElementById("cart-close");
            const cartItemsContainer = document.getElementById("cart-items");
            const cartCountBadge = document.getElementById("cart-count");
            const cartSubtotal = document.getElementById("cart-subtotal");
            const cartFooter = document.getElementById("cart-footer");
            const emptyCartMsg = document.getElementById("empty-cart-msg");

            let cart = [];

            const toggleCart = (open) => {
                const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });
                if (open) {
                    tl.to(cartDrawer, { x: "0%", duration: 1 })
                      .to(".cart-item-anim", { opacity: 1, y: 0, stagger: 0.1 }, "-=0.5");
                } else {
                    tl.to(cartDrawer, { x: "100%", duration: 0.8 });
                }
            };

            if (openCartBtn) openCartBtn.addEventListener("click", () => toggleCart(true));
            if (closeCartBtn) closeCartBtn.addEventListener("click", () => toggleCart(false));

            const updateCartUI = () => {
                if(cartCountBadge) cartCountBadge.textContent = cart.length;
                
                if (cart.length === 0) {
                    if(emptyCartMsg) emptyCartMsg.style.display = "flex";
                    if(cartFooter) cartFooter.classList.add("hidden");
                    if(cartItemsContainer) {
                        cartItemsContainer.innerHTML = '';
                        cartItemsContainer.appendChild(emptyCartMsg);
                    }
                    return;
                }

                if(emptyCartMsg) emptyCartMsg.style.display = "none";
                if(cartFooter) cartFooter.classList.remove("hidden");
                
                let total = 0;
                if(cartItemsContainer) {
                    cartItemsContainer.innerHTML = '';
                    
                    cart.forEach((item, index) => {
                        total += item.price;
                        const itemEl = document.createElement("div");
                        itemEl.className = "cart-item-anim flex gap-5 items-center";
                        itemEl.innerHTML = `
                            <div class="w-20 h-20 bg-stone-100 rounded-2xl flex-shrink-0 flex items-center justify-center p-2 border border-white shadow-inner">
                                <img src="${item.img}" class="w-full object-cover mix-blend-multiply" />
                            </div>
                            <div class="flex-1">
                                <h4 class="font-display font-bold text-sm uppercase tracking-tight text-black">${item.name}</h4>
                                <p class="font-mono text-[9px] text-stone-500 uppercase tracking-widest mt-1">R$ ${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                            </div>
                            <button onclick="window.removeFromCart(${index})" class="text-stone-300 hover:text-red-500 transition-colors">
                                <iconify-icon icon="solar:trash-bin-minimalistic-linear" class="text-xl"></iconify-icon>
                            </button>
                        `;
                        cartItemsContainer.appendChild(itemEl);
                    });
                }

                if(cartSubtotal) cartSubtotal.textContent = `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                
                // Animate items on update
                gsap.fromTo(".cart-item-anim", { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.5 });
            };

            window.addToCart = (product) => {
                cart.push(product);
                updateCartUI();
                toggleCart(true);
            };

            window.removeFromCart = (index) => {
                cart.splice(index, 1);
                updateCartUI();
            };

            // Cards and Hero buttons listener
            const bindProductButtons = () => {
                // Hero Button
                const heroBtn = document.querySelector('.btn-primary');
                if(heroBtn) {
                    // Remove existing to avoid double bind
                    const newHeroBtn = heroBtn.cloneNode(true);
                    heroBtn.parentNode.replaceChild(newHeroBtn, heroBtn);
                    newHeroBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        window.addToCart({ name: "Aura Series Tech", price: 2450, img: "assets/img/tech_glasses.png" });
                    });
                }

                // Bag Icons in cards
                document.querySelectorAll('.w-10.h-10.rounded-full.border.border-stone-200').forEach((btn, i) => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if(i === 0) window.addToCart({ name: "Aura Series Tech", price: 2450, img: "assets/img/tech_glasses.png" });
                        else if(i === 1) window.addToCart({ name: "Soft Rose Edition", price: 2150, img: "assets/img/modelo_03.png" });
                        else if(i === 2) window.addToCart({ name: "Aero Gold Titanium", price: 2850, img: "assets/img/modelo_04.png" });
                        else if(i === 3) window.addToCart({ name: "Midnight Dark Mode", price: 2950, img: "assets/img/modelo_07.png" });
                        else if(i === 4) window.addToCart({ name: "Pure Snow Essentials", price: 1650, img: "assets/img/white_glasses.png" });
                        else if(i === 5) window.addToCart({ name: "Urban Grey Metropolis", price: 1750, img: "assets/img/modelo_06.png" });
                        else if(i === 6) window.addToCart({ name: "Classic Shell Heritage", price: 1850, img: "assets/img/modelo_05.png" });
                        else if(i === 7) window.addToCart({ name: "Sunset Bronze Special", price: 1950, img: "assets/img/modelo_08.png" });
                    });
                });

                // "Comprar Agora" buttons in cards
                document.querySelectorAll('button.rounded-full.text-\\[10px\\]').forEach((btn, i) => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        // Mapping matches the bag icons order
                        if(i === 0) window.addToCart({ name: "Aura Series Tech", price: 2450, img: "assets/img/tech_glasses.png" });
                        else if(i === 1) window.addToCart({ name: "Soft Rose Edition", price: 2150, img: "assets/img/modelo_03.png" });
                        else if(i === 2) window.addToCart({ name: "Aero Gold Titanium", price: 2850, img: "assets/img/modelo_04.png" });
                        else if(i === 3) window.addToCart({ name: "Midnight Dark Mode", price: 2950, img: "assets/img/modelo_07.png" });
                        else if(i === 4) window.addToCart({ name: "Pure Snow Essentials", price: 1650, img: "assets/img/white_glasses.png" });
                        else if(i === 5) window.addToCart({ name: "Urban Grey Metropolis", price: 1750, img: "assets/img/modelo_06.png" });
                        else if(i === 6) window.addToCart({ name: "Classic Shell Heritage", price: 1850, img: "assets/img/modelo_05.png" });
                        else if(i === 7) window.addToCart({ name: "Sunset Bronze Special", price: 1950, img: "assets/img/modelo_08.png" });
                    });
                });
            };

            bindProductButtons();


            /* 1. Animação de Entrada (Intro / Hero Reveal) */
            const tlIntro = gsap.timeline({ defaults: { ease: "power4.out" } });

            tlIntro.to(".text-reveal-content", {
                y: "0%",
                opacity: 1,
                duration: 1.4,
                stagger: 0.2
            });

            tlIntro.to([".eyebrow-text", ".sub-headline", ".ctas"], {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.05
            }, "-=1.2");

            tlIntro.to(["#video-container", ".vertical-nav"], {
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: "power2.out"
            }, "-=1.0");


            /* 2. Apple-style Image Sequence para Scrub Perfeito */
            const canvas = document.getElementById("hero-canvas");
            if(canvas) {
                const context = canvas.getContext("2d");
                const frameCount = 40;
                const currentFrame = index => `assets/video/video_frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;
                const images = [];
                const glassesObj = { frame: 1 };
                
                for (let i = 1; i <= frameCount; i++) {
                    const img = new Image();
                    img.src = currentFrame(i);
                    images.push(img);
                }

                let loadedCount = 0;
                images.forEach((img, i) => {
                    if(img.complete) loadedCount++;
                    else img.onload = () => {
                        loadedCount++;
                        if(loadedCount === 1) render();
                    };
                });
                
                let lastLoadedFrameIndex = 0;

                function render() {
                    let frameIndex = Math.round(glassesObj.frame) - 1;
                    if (frameIndex < 0) frameIndex = 0;
                    if (frameIndex >= frameCount) frameIndex = frameCount - 1;
                    
                    let activeImage = images[frameIndex];
                    
                    if (!activeImage || !activeImage.complete) {
                        activeImage = images[lastLoadedFrameIndex];
                    } else {
                        lastLoadedFrameIndex = frameIndex;
                    }

                    if (activeImage && activeImage.complete) {
                        if (activeImage.width > 0 && (canvas.width !== activeImage.width || canvas.height !== activeImage.height)) {
                            canvas.width = activeImage.width;
                            canvas.height = activeImage.height;
                        }
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(activeImage, 0, 0, canvas.width, canvas.height);
                    }
                }

                const firstFrame = images[0];
                const drawInitial = () => {
                    if (firstFrame && firstFrame.complete && firstFrame.width > 0) {
                        canvas.width = firstFrame.width;
                        canvas.height = firstFrame.height;
                        render();
                    }
                };
                if(firstFrame) {
                    firstFrame.onload = drawInitial;
                    if (firstFrame.complete) drawInitial();
                }

                gsap.to(glassesObj, {
                    frame: frameCount,
                    snap: "frame",
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".hero-section",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1.2
                    },
                    onUpdate: render
                });
            }

            /* 3. Parallax e Desfoque nas Letrings ao fazer a rolagem */
            gsap.to([".eyebrow-text", ".hero-headline", ".sub-headline", ".ctas", ".vertical-nav"], {
                y: -120,
                opacity: 0,
                filter: "blur(12px)",
                stagger: 0.06,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "top -100%",
                    scrub: 1.0
                }
            });

            /* 4. Animação da Dobra Unificada (Showcase) */
            const tlShowcase = gsap.timeline({
                scrollTrigger: {
                    trigger: ".showcase-section",
                    start: "top 75%", 
                    end: "top 25%",
                    toggleActions: "play none none reverse"
                }
            });

            tlShowcase.to(".showcase-nav", {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out"
            });

            tlShowcase.fromTo([".showcase-card", ".showcase-card-3", ".showcase-card-4", ".showcase-card-5"], 
                { y: 80, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.15 },
                "-=0.6"
            );

            tlShowcase.to([".showcase-image-reveal", ".showcase-image-reveal-3", ".showcase-image-reveal-4", ".showcase-image-reveal-5"], {
                scaleY: 0,
                transformOrigin: "bottom",
                duration: 1.2,
                ease: "power4.inOut",
                stagger: 0.15
            }, "-=0.6");

            tlShowcase.to([".showcase-image", ".showcase-image-3", ".showcase-image-4", ".showcase-image-5"], {
                filter: "blur(0px)",
                scale: 1,
                duration: 1.5,
                ease: "power2.out",
                stagger: 0.1
            }, "-=1.0");

            tlShowcase.to([".showcase-title-frag", ".showcase-title-frag-3", ".showcase-title-frag-4", ".showcase-title-frag-5"], {
                y: "0%",
                opacity: 1,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.out"
            }, "-=1.2");

            tlShowcase.fromTo([".showcase-item", ".showcase-item-3", ".showcase-item-4", ".showcase-item-5"],
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 1.0, ease: "power2.out" },
                "-=1.0"
            );

            /* 5. Efeito Parallax no Letring e Detalhes da 2ª Dobra */
            gsap.to([".showcase-item", ".showcase-item-3", ".showcase-item-4", ".showcase-item-5"], {
                yPercent: -15,
                ease: "none",
                scrollTrigger: {
                    trigger: ".showcase-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.2
                }
            });

            /* 6. Animação da Dobra Essentials (Showcase 2) */
            const tlEssentials = gsap.timeline({
                scrollTrigger: {
                    trigger: ".showcase-section-2",
                    start: "top 75%", 
                    end: "top 25%",
                    toggleActions: "play none none reverse"
                }
            });

            tlEssentials.to(".showcase-nav-2", {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out"
            });

            tlEssentials.fromTo([".showcase-card-6", ".showcase-card-7", ".showcase-card-8", ".showcase-card-9"], 
                { y: 80, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.15 },
                "-=0.6"
            );

            tlEssentials.to([".showcase-image-reveal-6", ".showcase-image-reveal-7", ".showcase-image-reveal-8", ".showcase-image-reveal-9"], {
                scaleY: 0,
                transformOrigin: "bottom",
                duration: 1.2,
                ease: "power4.inOut",
                stagger: 0.15
            }, "-=0.6");

            tlEssentials.to([".showcase-title-frag-6", ".showcase-title-frag-7", ".showcase-title-frag-8", ".showcase-title-frag-9"], {
                y: "0%",
                opacity: 1,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.out"
            }, "-=1.2");

            tlEssentials.fromTo([".showcase-item-6", ".showcase-item-7", ".showcase-item-8", ".showcase-item-9"],
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 1.0, ease: "power2.out" },
                "-=1.0"
            );

        });
