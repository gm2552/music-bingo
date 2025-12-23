let availableNumbers = [];
let calledNumbers = new Set();
let history = [];
let playedVideos = new Set();

// YouTube video IDs for songs
const songVideos = [
    'cYwDUonrGFQ?si=eImbJT9YLhHlFhy_', // 1 Hound Dog - Elvis Presley (Official Lyric Video) :contentReference[oaicite:0]{index=0}
    'O21xFX7QBpE?si=HiZM9V9W1R-jUwlh', // 2 Rock Around The Clock - Bill Haley & His Comets (High-viewed official upload) :contentReference[oaicite:1]{index=1}
    'nFVPMPRejjw?si=OMtbdX1An0VMtv_T"', // 3 Ob-La-Di, Ob-La-Da - The Beatles (Popular upload / best available) 
    'Txf8bybCQp0?si=7K_99vL6FxtS1d4h', // 4 Calendar Girl - Neil Sedaka (Official or high-quality upload) 
    'nFch8vH81ks?si=mmD7oFX6MDv-GgiJ', // 5 Runaround Sue - Dion (Original video upload on artist channel) :contentReference[oaicite:2]{index=2}
    'kvazBqAlx58?si=aWvW3BntwJYYKYCw', // 6 Put Your Head on My Shoulder - Paul Anka (Official Audio / auto-generated) :contentReference[oaicite:0]{index=0}
    'Zv8czIoAw5w?si=WVUGYuqm8Zka0Nlp', // 7 Unchained Melody - The Righteous Brothers (Official Audio / remastered) 
    'Qe_1B1P9Bw4?si=XXKVeJV8xiZqWAmj', // 8 Les Bicyclettes de Belsize - Engelbert Humperdinck (Best available upload)
    'E6yGhe2gQxw?si=1YYgsdSLYa2KVYi8', // 9 Rockin’ Robin - Bobby Day (Official Audio/Topic)
    '0aU57V6VBW0?si=PyOaSWArx4QYaUo7', // 10 Love Will Keep Us Together - Captain & Tennille (Official Audio/Topic)
    'gxEPV4kolz0?si=z5JxbNOBdpjy_F79', // 11 Piano Man - Billy Joel (Official Audio/Topic)
    'C19InkgElIE?si=7rSqLQxlCtU_YcEP', // 12 Land of Confusion - Genesis (Official Video) 
    '1k8craCGpgs?si=pmf1fxnxmvgeEZWA', // 13 Don’t Stop Believin’ - Journey (Official Audio/Remastered) 
    'fJ9rUzIMcZQ?si=roMm6efNTcGlKQyw', // 14 Bohemian Rhapsody - Queen (Official Video) 
    '2ognf_oRQWM?si=6-mBSb9fizXeIChO', // 15 Livin’ on a Prayer - Bon Jovi (Official Audio/Video) 
    'B4c_SkROzzo?si=FJ8FEltaZz3Eqn73', // 16 Break My Stride - Matthew Wilder (Official Lyric/Audio)
    'Bke7L0E8hu4?si=fs4WKsIerB_yLynZ', // 17 Into The Groove - Madonna (Official / best available upload) :contentReference[oaicite:0]{index=0}
    'Lp2qcCrdBLA?si=Ur34-K-OXMztIFt8', // 18 Brother Louie - Modern Talking (Official Video) :contentReference[oaicite:1]{index=1}
    'i8TKoBPkZQo?si=FZestuhO_4tWY_R1', // 19 Lessons In Love - Level 42 (Official Music Video) :contentReference[oaicite:2]{index=2}
    'II4sfbrsdn4?si=JrKXle2JxKNHNgZ_', // 20 Take On Me - a-ha (Official Music Video) :contentReference[oaicite:3]{index=3}
    '7_eXiEbx1e0?si=2SfIlVBx2hwSkqBY', // 21 Save Me - Jelly Roll (Official Audio) :contentReference[oaicite:4]{index=4}
    '1okN-dOy8Zk?si=mikdic_BxFtYMH-t', // 22 I Walk the Line - Johnny Cash (Official Audio/Topic)
    'tnhBaDw1cZg?si=eP-NSbrAhB9mQuVI', // 23 Back in Baby’s Arms - Patsy Cline (Official Audio / best available)
    'dBN86y30Ufc?si=E3_X8qfDXkqfjjX1', // 24 On the Road Again - Willie Nelson (Official Audio / Topic)
    'YQbSy8bgVr0?si=TIf-EodyXjSFQMnn', // 25 I Saw the Light - Hank Williams (Best available historic upload)
    '1vrEljMfXYo?si=J15IGioaZvQpbueJ', // 26 Country Roads - John Denver (Official Audio) :contentReference[oaicite:0]{index=0}
    'eAR_Ff5A8Rk?si=n2GXhz1Fw9THCLES', // 29 You’ve Got a Friend - Carole King (Official Audio) :contentReference[oaicite:1]{index=1}
    'FJbj5jAwI1A?si=FAGNppy0ZoFSiKEX', // 27 Tennessee Waltz - Patti Page (Best available classic upload)
    'Ixrje2rXLMA?si=s3tsQIsByk50EB3e', // 30 Jolene - Dolly Parton (Official Audio/Topic)
    'PYMUhMr7QW0?si=5NJxJlsGPXon5z7Z', // 31 Yes Sir! That’s My Baby (High-viewed upload)
    'YsGjFh1ke44?si=fcV2gyjykL0gdYAe', // 32 Puttin’ On The Ritz (Classic upload)
    'CFlMy48ui9s?si=S_sc2_8xOIekzCQ0', // 33 Fly Me To The Moon - Frank Sinatra (Official/Best available)
    'YtZ-IgUjALo?si=6hS4XHxgYpyx16VZ', // 34 At Last - Etta James (Official/High-quality upload)
    'rBrd_3VMC3c?si=TBOABfMQ-BQvsTK9', // 35 What A Wonderful World - Louis Armstrong (Official Upload)
    'ckKeQNCyPBU?si=i6J5mdFU197kn3yB', // 28 You Are My Sunshine - Jimmie Davis (High-viewed classic upload)
    'iF7kOq0peAU?si=iPCwdaukg2t41EYo', // 36 Unforgettable - Nat King Cole (Official Audio)
    'cyRO5xy74Pw?si=BEzdaKCFc3VvWxdL', // 37 Smile - Michael Bublé (Official Audio/Topic)
    'qAPCq1PuENc?si=LxU-a3caIvQbKwwf', // 38 Let’s Do It (Let’s Fall in Love) - Cole Porter (Classic version upload)
    'TOPSETBUgvQ?si=j_Djx6h-ttKLcHDh', // 39 Sing, Sing, Sing - Louis Prima (Best available)
    '-1senwBr6GE?si=8oROdlRIf6X8fRl1', // 40 Beer Barrel Polka - Classic Polka Band (High-viewed version)
    'y3KJ7d2qBoA?si=cjoTtWfe9ZDzH62u', // 41 My Girl - The Temptations (Official Video)
    '58RgLQ_0Ars?si=FLoWCvdaugnevt4n', // 42 I Just Called to Say I Love You - Stevie Wonder (Official Video)
    'cXWHpbpNdHE?si=cEVNbPUJ-JNvjJh8', // 43 I Heard It Through the Grapevine - Marvin Gaye (Official Video)
    'une981B7Q4Y?si=g_YtVEff6wrZmHvE', // 44 Stop! In the Name of Love - The Supremes (Official Video)
    'MRb1-SAAIzs?si=_i2BOtxmVD-3wm3u', // 45 In the Still of the Night - The Five Satins (Best available classic upload)
    'uSiHqxgE2d0?si=zA0ojMn9HJxhBD2O', // 46 Hit the Road Jack - Ray Charles (Official Video)
    'W-apaIOOoAo?si=_tyxZ66yk0rmAsSW', // 47 I’ll Be There - The Jackson 5 (Official Video)
    'hD62z4w4ZI4?si=pM2exwRGSIwbfK3G', // 48 Freeway of Love - Aretha Franklin (Official Video)
    '3JWTaaS7LdU?si=r6zyurwldzy4Fcts', // 49 I Will Always Love You - Whitney Houston (Official Video)
    '2EaflX0MWRo?si=LkocqhjvpUgZQLlS', // 50 Reach Out (I’ll Be There) - The Four Tops (Official Video)
    'hN5DKM72O_s?si=FPjWKgqU8-s4em0C', // 51 The Spirit of Adventure (from Up) - Michael Giacchino (Official Soundtrack)
    'hTSz-W1Wi7s?si=eTw2SUtyuMnLL1gD', // 52 Edelweiss (from The Sound of Music) (Official Movie Clip)
    'ew40GYVWopY?si=NTNdKeO27URRcQsZ', // 53 Oh What a Beautiful Mornin’ (from Oklahoma!) (Best classic upload)
    'StB2WR4Hwdo?si=mwb6FZebXhz8x-na', // 54 Singin’ in the Rain (from Singin’ in the Rain) (Official Movie Clip)
    'nDJockBnjYs?si=IKDl84-gLCdN5YLw', // 55 Everybody Wants to Be a Cat (from The Aristocats) (Official Disney upload)
    'YVVTZgwYwVo?si=X_ZoT_2cIFDLhTU8', // 56 Let It Go (from Frozen) - Idina Menzel (Official Disney Video)
    'TXbHShUnwxY?si=sdrWdyjznOVqNeHf', // 57 Once Upon a Dream (from Sleeping Beauty) (Official Disney upload)
    'cyOLHOcLdr4?si=dwj1_0nB-7_N6ZK2', // 58 A Dream Is a Wish Your Heart Makes (from Cinderella) (Official Disney upload)
    'Ga-ijQP0KxY?si=eY8fEv7rYFacJX8B', // 59 The Circle of Life (from The Lion King) (Official Disney upload)
    'OsiNEkDfgfY?si=1WDufHRd_kYILOOO', // 60 Bella Notte (from Lady and the Tramp) (Official Disney upload)
    's_nBSSXiG9w?si=jwvl_foB0iQnB9Wv', // 61 Maple Leaf Rag - Scott Joplin (Official/Best audio performance)
    'Z_CWeWWOed8?si=9YJrxWbUG4k54Jf4', // 62 By the Waters of Minnetonka - Zez Confrey (Best classical upload)
    'TpOdsttjVO0?si=T9g37JgtbCCI-Pym', // 63 The Skater’s Waltz - Emile Waldteufel (Classical performance upload)
    'VdqctAW8bUQ?si=lw_onVRiJRsm1eYD', // 64 Cha Chita - El Chicano (Official/Best available upload)
    'LdpMpfp-J_I?si=EblQrmRCaN17nUPk', // 65 YYZ - Rush (Official Audio)
    'RrECR8daZPg?si=XpKUcvIsewUa3GVk', // 66 Over the Mountain - Ozzy Osbourne (Official Audio)
    'ggJI9dKBk48?si=igHr2-2GyB_31fAs', // 67 Jump - Van Halen (Official Music Video)
    'v2AC41dglnM?si=1TFqlb-oxgIaSopo', // 68 Thunderstruck - AC/DC (Official Music Video)
    'Q4VkYR4Zj5w?si=Yun-78jBFasgYjSV', // 69 Highway Star - Deep Purple (Official Live/Best Quality)
    'RWgTD_0jxeE?si=iH-9WXDQ8hzQxjcN', // 70 School’s Out - Alice Cooper (Official Music Video)
    '0Ui-QzihJGo?si=sX1Q39xOYaaVTlHy', // 71 Can’t Stop the Feeling! - Justin Timberlake (Official Video)
    'n3kDc9M2kqE?si=TnzogsX3fsMbM3fG', // 72 High Hopes - Panic! at the Disco (Official Video)
    '0OWj0CiM8WU?si=BrNrXIK7Z_8G7zFl', // 73 Love Runs Out - OneRepublic (Official Video)
    'itUJUs95LqU?si=LVj5VF2i3aJr4YNF', // 74 Uprising - Muse (Official Video)
    '5tDjYuqJRJQ?si=QI7HrE3OZ5_yR8xj' // 75 Come With Me Now - Kongos (Official Video)
];

// Get the letter for a bingo number
function getLetter(number) {
    if (number <= 15) return 'B';
    if (number <= 30) return 'I';
    if (number <= 45) return 'N';
    if (number <= 60) return 'G';
    return 'O';
}

// Initialize the game
function initGame() {
    // Generate numbers 1-75
    availableNumbers = Array.from({ length: 75 }, (_, i) => i + 1);
    calledNumbers.clear();
    playedVideos.clear();
    history = [];
    generateGrid();
    updateHistory();
    // Hide YouTube player
    document.getElementById('youtubePlayer').src = '';
    document.querySelector('.youtube-player').classList.add('hidden');
}

// Generate the bingo grid
function generateGrid() {
    const bingoGrid = document.getElementById('bingoGrid');
    bingoGrid.innerHTML = '';

    const letters = ['B', 'I', 'N', 'G', 'O'];
    const ranges = [[1,15], [16,30], [31,45], [46,60], [61,75]];

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 15; col++) {
            const cell = document.createElement('div');
            cell.className = 'bingo-cell';

            const number = ranges[row][0] + col;
            cell.textContent = letters[row] + number;
            cell.dataset.number = number;

            bingoGrid.appendChild(cell);
        }
    }
}

// Call a random number
function callNumber() {
    if (availableNumbers.length === 0) {
        alert('All numbers have been called!');
        return;
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const calledNumber = availableNumbers.splice(randomIndex, 1)[0];

    calledNumbers.add(calledNumber);
    history.unshift(calledNumber);
    if (history.length > 5) {
        history.pop();
    }

    updateGrid();
    updateHistory();
    playSongForNumber(calledNumber);
}

// Update the grid to show called numbers
function updateGrid() {
    const cells = document.querySelectorAll('.bingo-cell');
    cells.forEach(cell => {
        const number = parseInt(cell.dataset.number);
        if (calledNumbers.has(number)) {
            cell.classList.add('called');
            cell.addEventListener('click', () => playSongForNumber(number));
        }
    });
}

// Update history display
function updateHistory() {
    const historyContainer = document.getElementById('historyNumbers');

    historyContainer.innerHTML = '';

    if (history.length > 0) {
        // Display last 5 numbers (including current)
        const lastFive = history.slice(0, 5);
        lastFive.forEach((number, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = index === 0 ? 'current-circle' : 'history-number';
            historyItem.textContent = getLetter(number) + number;
            historyItem.addEventListener('click', () => playSongForNumber(number));
            historyContainer.appendChild(historyItem);
        });
    }
}

// Play the song associated with a specific number
function playSongForNumber(number) {
    const index = number - 1;
    if (index >= 0 && index < songVideos.length) {
        const video = songVideos[index];
        const iframe = document.getElementById('youtubePlayer');
        iframe.src = `https://www.youtube.com/embed/${video}?autoplay=1`;
        document.querySelector('.youtube-player').classList.remove('hidden');
    }
}

// Play a random song on YouTube
function playRandomSong() {
    const availableVideos = songVideos.filter(video => !playedVideos.has(video));
    if (availableVideos.length === 0) {
        // All videos have been played in this game, skip playing
        return;
    }
    const randomVideo = availableVideos[Math.floor(Math.random() * availableVideos.length)];
    playedVideos.add(randomVideo);
    const iframe = document.getElementById('youtubePlayer');
    iframe.src = `https://www.youtube.com/embed/${randomVideo}?autoplay=1`;
}

// Event listeners
document.getElementById('callNumber').addEventListener('click', callNumber);
document.getElementById('newGame').addEventListener('click', function() {
    if (confirm('Are you sure you want to start a new game? This will reset all called numbers.')) {
        initGame();
    }
});

// Initialize on load
initGame();
