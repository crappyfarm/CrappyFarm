<script>//<![CDATA[
document.addEventListener('DOMContentLoaded', () => {
    let digCount = 0;
    const nightShiftBtn = document.getElementById('nightShiftBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const body = document.querySelector('body');
    const nightShiftModal = document.getElementById('nightShiftModal');
    const webAppUrl = 'https://script.google.com/macros/s/AKfycbz3lYhbtza7wVfPjh8UHBNXX-OoRpeL3wxewtgAcp0YHURx-bw-jSlBns40RyGbziwBIw/exec';
    const webbAppUrl = 'https://script.google.com/macros/s/AKfycbyHCn8KQCtkY5NddP8R7Cmnq76EriF42wT9NV-CyfhubG2l3qUrDwqKKHclso5VRQQkvw/exec';

    // Unified data management
    let gameData = {
        inventory: [],
        leaderboard: []
    };

    // Toggle system
    const inventoryLeaderboardBtn = document.querySelector('[data-target="inventory"]');
    let showingLeaderboard = false;

    inventoryLeaderboardBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showingLeaderboard = !showingLeaderboard;

        if (showingLeaderboard) {
            this.textContent = '🎒 Inventory';
            document.getElementById('inventory').classList.remove('active-pane');
            document.getElementById('leaderboard').classList.add('active-pane');
            updateLeaderboard();
        } else {
            this.textContent = '🏆 Leaderboard';
            document.getElementById('leaderboard').classList.remove('active-pane');
            document.getElementById('inventory').classList.add('active-pane');
            updateInventory();
        }
    });

    // Data fetching and processing
    async function fetchGameData() {
        try {
            const response = await fetch(`${webAppUrl}?action=getInventory`);
            if (!response.ok) throw new Error(`Server response error: ${response.status}`);

            const data = await response.json();
            gameData = {
                inventory: data.inventory || [],
                leaderboard: data.leaderboard || []
            };

            updateInventory();
            updateLeaderboard();
            document.getElementById('error-message').textContent = '';
        } catch (error) {
            console.error('Data fetch error:', error);
            document.getElementById('error-message').textContent = 'Failed to load game data';
        }
    }

    function updateInventory() {
        const tbody = document.querySelector('#inventory-table tbody');
        tbody.innerHTML = ''; // Clear existing rows
        gameData.inventory.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${item.emoji}</td><td>${item.count}</td>`;
            tbody.appendChild(row);
        });
    }

    function updateLeaderboard() {
        const tbody = document.querySelector('#leaderboard-table tbody');
        tbody.innerHTML = ''; // Clear existing rows
        gameData.leaderboard.forEach((entry, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${entry.username}</td>
                <td>${entry.count}</td>
            `;
            tbody.appendChild(row);
        });
    }

    // Panel management
    document.querySelectorAll('.menu-toggle').forEach(button => {
        if (button.dataset.target !== 'inventory') {
            button.addEventListener('click', function() {
                if (showingLeaderboard) {
                    inventoryLeaderboardBtn.textContent = '🎒 Inventory';
                    showingLeaderboard = false;
                    document.getElementById('leaderboard').classList.remove('active-pane');
                    document.getElementById('inventory').classList.add('active-pane');
                }
                document.querySelectorAll('.menu-toggle').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.content-pane').forEach(pane => pane.classList.remove('active-pane'));
                this.classList.add('active');
                document.getElementById(this.dataset.target).classList.add('active-pane');
            });
        }
    });

    // Modal setup
    const modalContent = document.createElement('div');
    modalContent.classList.add('fullscreen-modal');

   // Animated image
const animatedImage = document.createElement('img');
animatedImage.src = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4rrSYFAeNOjwBkv1jnx3MgdTunDC1ejIOoWsW-o9EPqqlztkLqwCilu4i2361GChQaSLOztgXqczMBTQLPDSttL0jDLXSUz5FARPTePaL1QmIZl0a1XL6koUmzctuTlAOEvOnXthFY8yd7WwPVaLiG7D6dUOgATrcUYr7gilH0jLM5ejXl0JiI1CUe70/s320/farming-$CRAP.gif";
animatedImage.alt = "Farming $CRAP";
animatedImage.style.width = "50%";
animatedImage.style.height = "auto";
animatedImage.style.marginBottom = "20px";

// Ensure the image is on top of everything
animatedImage.style.position = "fixed"; // or "absolute" if you want it to not stay in view while scrolling
animatedImage.style.top = "50%"; // Center vertically
animatedImage.style.left = "50%"; // Center horizontally
animatedImage.style.transform = "translate(-50%, -50%)"; // Adjust for exact centering
animatedImage.style.zIndex = "999999"; // Set a high z-index to ensure it's on top

// Append the image to the body (or another container)
document.body.appendChild(animatedImage);

    // Ad slider
    const adSlider = document.createElement('div');
    adSlider.classList.add('ad-slider');
    const ads = [
        '<iframe src="https://acceptable.a-ads.com/2365525?size=Adaptive&background_color=transparent" class="ad-frame"></iframe>',
        '<iframe src="https://zerads.com/ad/ad.php?width=468&ref=6531" width="468" height="60" scrolling="no" style="border: 0;" sandbox="allow-same-origin allow-scripts"></iframe>',
        '<script type="text/javascript" src="https://hungryforhits.com/widgetads_show.php?widgetid=272"><\/script>',
        '<iframe src="https://www.netvisiteurs.com/promotion-88485.php" width="469" height="61" scrolling="no" style="border: none;" sandbox="allow-same-origin allow-scripts"></iframe>',
        '<script src="https://adsvert.com/getsadjs.php?i=69158&u=freebeecoin&s=2&c=14"><\/script>',
        '<iframe src="https://ad2bitcoin.com/ad.php?ref=tyfriend&width=468" width="468" height="60" scrolling="no" style="border: 0;" sandbox="allow-same-origin allow-scripts"></iframe>'
    ];

    // Shuffle ads
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledAds = shuffle(ads);

    // Populate ad slider
    shuffledAds.forEach(ad => {
        const slide = document.createElement('div');
        slide.classList.add('ad-slide');
        slide.innerHTML = ad;
        adSlider.appendChild(slide);
    });

    // Close button
    const closeModalButton = document.createElement('button');
    closeModalButton.id = 'closeModal';
    closeModalButton.classList.add('modal-close-btn');
    closeModalButton.textContent = 'Farming completes soon...';

    // Append everything to modal
    modalContent.appendChild(animatedImage);
    modalContent.appendChild(adSlider);
    modalContent.appendChild(closeModalButton);
    nightShiftModal.appendChild(modalContent);

    // User management
    document.getElementById('setUsernameBtn').addEventListener('click', (e) => {
        e.preventDefault();
        const username = prompt("Enter username (solana|cashapp|email):");
        if (username) {
            if (!/^[a-zA-Z0-9|@.]+$/.test(username)) {
                return alert('Invalid username format!');
            }
            sessionStorage.setItem('username', username);
            alert(`Username set: ${username}`);
        } else {
            alert('Username required!');
        }
    });

    // Banking system
    document.getElementById('bankButton').addEventListener('click', async function() {
    const username = sessionStorage.getItem('username');
    if (!username) return alert('Set username first!');
    console.log('Retrieved username for banking:', username); // Debugging line

    if (!loadingSpinner) return alert('Loading spinner element is missing!');
    loadingSpinner.style.display = 'block';

    try {
        const webAppUrl = 'https://script.google.com/macros/s/AKfycbz3lYhbtza7wVfPjh8UHBNXX-OoRpeL3wxewtgAcp0YHURx-bw-jSlBns40RyGbziwBIw/exec?action=bankUser&username=';
        console.log(`Fetching data from: ${webAppUrl}${encodeURIComponent(username)}`); // Debugging line

        const response = await fetch(`${webAppUrl}${encodeURIComponent(username)}`, {
            method: 'GET'
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error('Response error:', errorDetails);
            throw new Error(`Banking failed: ${response.status} - ${errorDetails}`);
        }

        const data = await response.json();
        console.log('Data received from server:', data); // Debugging line

        if (!data || typeof data.total === 'undefined' || typeof data.amountBanked === 'undefined') {
            throw new Error('Invalid response from server: missing required fields');
        }

        let digCount = 0;
        const clickCounter = document.querySelector('.click-counter');
        const coinCount = document.getElementById('coin-count');
        if (!clickCounter || !coinCount) {
            throw new Error('Required DOM elements are missing!');
        }
        clickCounter.textContent = digCount;
        coinCount.innerText = `${data.total}`;

        try {
            await fetchGameData(); // Refresh data after banking
        } catch (gameDataError) {
            console.error('Failed to refresh game data:', gameDataError);
            alert('Failed to refresh game data. Please try again.');
        }
    } catch (error) {
        console.error('Error during banking:', error);
        alert(`Bank Error: ${error.message}`);
    } finally {
        loadingSpinner.style.display = 'none';
    }
});

    // Dig system
    if (nightShiftBtn) {
        nightShiftBtn.addEventListener('click', async function() {
            let username = sessionStorage.getItem('username');
            if (!username) {
                username = prompt("Enter username:");
                if (!username) return alert('Username required!');
                if (!/^[a-zA-Z0-9|@.]+$/.test(username)) {
                    return alert('Invalid username format!');
                }
                sessionStorage.setItem('username', username);
            }

            // Show processing state
            nightShiftModal.style.display = 'block';
            document.body.style.pointerEvents = 'none';
            nightShiftBtn.disabled = true;

            try {
                const formData = new FormData();
                formData.append('user', username);
                formData.append('shift', 1);
                const response = await fetch(webbAppUrl, {
                    method: 'POST',
                    body: formData
                });
                if (!response.ok) throw new Error('Dig failed');

                digCount++;
                document.querySelector('.click-counter').textContent = digCount;
                await fetchGameData(); // Refresh data after successful dig
            } catch (error) {
                alert(`Dig Error: ${error.message}`);
            } finally {
                let countdown = 10;
                const countdownInterval = setInterval(() => {
                    countdown--;
                    closeModalButton.textContent = `Dig finishes in ${countdown} seconds...`;
                    if (countdown <= 0) {
                        clearInterval(countdownInterval);
                        closeModalButton.textContent = 'DIGGING';
                        nightShiftModal.style.display = 'none';
                        document.body.style.pointerEvents = 'auto';
                        nightShiftBtn.disabled = false;
                    }
                }, 1000);
            }
        });
    }

    // Initial setup
    setTimeout(fetchGameData, 10000);
    setInterval(fetchGameData, 300000);

    document.getElementById('closeModal').addEventListener('click', () => {
        nightShiftModal.style.display = 'none';
        document.body.style.pointerEvents = 'auto';
    });
});

// Create and show the "Restore Farm" banner after 5 seconds
document.addEventListener('DOMContentLoaded', () => {
    // Wait 7 seconds before showing the banner
    setTimeout(() => {
        // Array of ad URLs to cycle through
        const adUrls = [
            "https://acceptable.a-ads.com/2365525?size=Adaptive&background_color=transparent", // Replace with your actual ad URLs
            "https://zerads.com/ad/ad.php?width=468&ref=6531",
	    "https://ad2bitcoin.com/ad.php?ref=tyfriend&width=468"
        ];

        let currentAdIndex = 0; // Track the current ad index

        // Create the banner container
        const banner = document.createElement('div');
        banner.classList.add('restore-farm-banner');

        // Add the healing emoji and text (clickable button)
        const textContainer = document.createElement('div');
        textContainer.classList.add('text');
        textContainer.innerHTML = `
            <span class="emoji">☎️</span>
            <span><strong>SEE VET</strong></span>
        `;
        textContainer.addEventListener('click', () => {
            window.open('https://zerads.com/vetvisit'); // Replace with your desired link
        });

        // Add the ad iframe
        const adIframe = document.createElement('iframe');
        adIframe.width = 468;
        adIframe.height = 60;
        adIframe.border = 'none';
        adIframe.style.overflow = 'hidden'; // Hide overflow
        adIframe.src = adUrls[currentAdIndex]; // Set the initial ad URL

        // Function to cycle through ad URLs
        function cycleAds() {
            currentAdIndex = (currentAdIndex + 1) % adUrls.length; // Move to the next ad URL
            adIframe.src = adUrls[currentAdIndex]; // Update the iframe's src
        }

        // Cycle ads every 30 seconds (adjust as needed)
        setInterval(cycleAds, 30000);

        // Add the close button
        const closeButton = document.createElement('button');
        closeButton.classList.add('close-btn');
        closeButton.textContent = 'X';
        closeButton.addEventListener('click', () => {
            banner.style.bottom = '-100px'; // Slide the banner out of view
        });

        // Append all elements to the banner
        banner.appendChild(textContainer);
        banner.appendChild(adIframe);
        banner.appendChild(closeButton);

        // Add the banner to the body
        document.body.appendChild(banner);

        // Slide the banner into view
        setTimeout(() => {
            banner.classList.add('active');
        }, 100); // Small delay for smooth animation
    }, 5000); // 5 seconds delay
});

// Function to open the modal
function openModal() {
    document.body.classList.add('modal-active'); // Add modal-active class to hide #game-main
    document.querySelector('.fullscreen-modal').style.display = 'flex'; // Show the modal

    // Automatically close the modal after 5 seconds (adjust as needed)
    setTimeout(() => {
        closeModal();
    }, 5000); // 5000ms = 5 seconds
}


//]]>
</script>
