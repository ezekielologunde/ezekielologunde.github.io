/* Directory data and search for Tiktok.html (moved out of the page for the CSP). */
(function () {
    // List extracted and cleaned from Let.txt
    const profiles = [
        { name: "Let's Cyber", username: "letscyber" },
        { name: "Creatively Ange", username: "creativelyange" },
        { name: "Lan Luvah", username: "lanluvah" },
        { name: "Symoné Beez", username: "symonebeez" },
        { name: "Sweeeezy IT", username: "sweeeezyit" },
        { name: "Tech Woke", username: "techwoke" },
        { name: "Brandy J. | CLT Creator", username: "boldlybrandy" },
        { name: "OCILLA", username: "iamocilla" },
        { name: "Zane", username: "zanetheeninja" },
        { name: "Jet Wind Lab", username: "jetwindlab" },
        { name: "Euni Cyber Girl", username: "eunicybergirl" },
        { name: "hackHERproof", username: "hackherproof" },
        { name: "Lance", username: "lancealot007" },
        { name: "DJ Whisper", username: "djwhisper" },
        { name: "Lunchbox", username: "tech_tips4you" },
        { name: "Antonio", username: "antonio.ow" },
        { name: "Bytekage", username: "bytekage" },
        { name: "Lenny J", username: "thereallennyj" },
        { name: "Authoryzation", username: "authoryzation" },
        { name: "Crein Tech", username: "creintech" },
        { name: "James Anthony Journey", username: "jamesanthonyjourney" },
        { name: "Zion Harvin", username: "zion.harvin" },
        { name: "CloudGodKord", username: "cloudgodkord" },
        { name: "Greg", username: "greghahre" },
        { name: "Codexo", username: "codexo98" },
        { name: "Cyrone WXOS", username: "cyronewxos" },
        { name: "Cyntraix", username: "cyntraix" },
        { name: "Cyber Girl Diaries", username: "cybergirldiaries" },
        { name: "Evan Hyearwood", username: "evanhyearwood" },
        { name: "The Cyber Guy", username: "lil_elvis83" },
        { name: "Shawn Kyree", username: "shawn_kyree55" },
        { name: "Cyber Ducky", username: "cyberduckyofficial" },
        { name: "Andres Vidoza", username: "andresvidoza" },
        { name: "Nathan The Engineer", username: "zahiran227" },
        { name: "Wreck It Mech", username: "wreckitmech" },
        { name: "Get 2 Cloud", username: "get2cloud" },
        { name: "Reyan", username: "reyanqureshi" },
        { name: "Cam | CyberSecurity", username: "tech_withcam" },
        { name: "Oso.dev", username: "oso.dev" },
        { name: "Samira", username: "techysammy" },
        { name: "Delmi Training Institute", username: "delmitraining" },
        { name: "Lumia Techs", username: "lumiatechs" },
        { name: "Caleb Davis", username: "smoovee.cd" },
        { name: "All Systems Ray.exe", username: "all.systems.ray.exe" },
        { name: "BEN K USA", username: "benkip_kiruiusa" },
        { name: "David Lyons", username: "proofofdk" },
        { name: "Empty Jump Jo", username: "emptyjumpjo1" },
        { name: "Kristian Paul-Oti", username: "elpaulkris" },
        { name: "Tristan", username: "exroh" },
        { name: "Developer Matt B", username: "deveopermattb" },
        { name: "Everything Moving", username: "everything.moving" },
        { name: "Al Be and Tech", username: "albryant.tech" },
        { name: "Informatik Lab", username: "gregaku" },
        { name: "Demetrius Harvey", username: "demetriustech" },
        { name: "PortaSecure", username: "portasecure" },
        { name: "Sybrinity LLC", username: "sybrinityllc" },
        { name: "SapphireBlu", username: "marrrri.__" },
        { name: "Dein Lynn", username: "dein.lynn4" },
        { name: "Homelab Networks", username: "homelabnetworks" },
        { name: "Kevin", username: "kevoreacts_" },
        { name: "Ur Daily Dose of Internet", username: "urdailydoseofinternet28" },
        { name: "Cyber Security Boo", username: "cybersecurityboo" },
        { name: "AI Automation Labs", username: "automationlabs.business" },
        { name: "CyberDani", username: "thecyberdani" },
        { name: "Daily Tech Dose", username: "tech_geekk" },
        { name: "Hackers to Founders", username: "hackerstofounders" },
        { name: "Island IT Guy", username: "island.it.guy" },
        { name: "Certs and Coffee", username: "certsandcoffee" },
        { name: "Millie | Cybergrad Chronicles", username: "cybergradchronicles" },
        { name: "Alima On Air", username: "alimaonair" },
        { name: "Infosec Institute", username: "infosecinstitute" },
        { name: "Iqra | Cybersecurity", username: "iqraxma" },
        { name: "D Smith", username: "dsmith9" },
        { name: "Trey Incs", username: "treyincs" },
        { name: "J0sh T3ch", username: "j0sh_t3ch" },
        { name: "Felipe IAM Cybersecurity", username: "felipeiamcybersec" },
        { name: "Gardy Saturne", username: "gardysaturne" },
        { name: "Rod", username: "rodtakes" },
        { name: "Shark Byte", username: "_shark_byte" },
        { name: "AJ", username: "techwithaj1" },
        { name: "Cyber Smart Resource", username: "cybersmartresource" },
        { name: "Cyber Ninja", username: "cyberninja257" },
        { name: "The Practical CISO", username: "thepracticalciso" },
        { name: "Josh Madakor", username: "joshmadakor" },
        { name: "Angela", username: "itsangelahey" },
        { name: "Cybersecure Weekly", username: "cybersecureweekly" },
        { name: "Brittany Nicole", username: "xo.bnicole" },
        { name: "Cyber Ratel", username: "cyberratel" },
        { name: "Kylie J | CCJ Podcast", username: "cybercrimejunkiespodcast" },
        { name: "Deadboy Divine", username: "deadboydivine" },
        { name: "Didiporshe | Cybersecurity", username: "didiporshe0" },
        { name: "MG in IT", username: "mg.in.it" },
        { name: "Keepin' It Faith", username: "faithyywaithyy" },
        { name: "The Network Attorney", username: "thenetworkattorney" },
        { name: "Cyber Net Sec", username: "cybernetsec" },
        { name: "Ben Networking", username: "dripwayy" },
        { name: "Deadpan Crickets", username: "deadpancrickets" },
        { name: "Monica Alvarez", username: "monica.alvarez833" },
        { name: "JayJ The Jet", username: "jayjaythejet" },
        { name: "Technical Institute of America", username: "technicalioa" },
        { name: "JTech", username: "jtech183" },
        { name: "The IT Gamer", username: "the.it.gamer" },
        { name: "Benjamin Kay", username: "benjaminlexbet" },
        { name: "Cloud Tech Exec", username: "cloudtechexec" },
        { name: "Kauzilious", username: "luv4kero" },
        { name: "Mohammad Mahdi", username: "mohammadaboosaiedi" },
        { name: "Technically Jeff", username: "technicallyjefff" },
        { name: "Code Ninjas Brampton East", username: "codeninjasbramptoneast" },
        { name: "IMD Technologies", username: "imdtechnologies" },
        { name: "Cyberkoyo", username: "keikoyoter" },
        { name: "Vazkeft", username: "vazkeft" },
        { name: "Ty Talks Tech", username: "tytalkstech" },
        { name: "1CONNECT", username: "1connect" },
        { name: "BigI", username: "bigibz1" },
        { name: "Zero Day Sloan", username: "zerodaysloan" },
        { name: "Packet Chasers", username: "packet.chasers" },
        { name: "HY CONNECT", username: "hy.connect1" },
        { name: "Axon Tech", username: "axon.tech" },
        { name: "Amir | Cyber with Amir", username: "cyberwithamir" },
        { name: "Setup.s", username: "setup.s" },
        { name: "Network Verse", username: "networkverse" },
        { name: "Alias Cybersecurity", username: "aliascybersecurity" },
        { name: "GitKraken", username: "gitkraken" },
        { name: "Simplex-IT", username: "simplex.it" },
        { name: "Dr. Barry | PhD Cyber & AI", username: "drbarryofficial" },
        { name: "Rodney | The Cyber Mentor", username: "rodney_arceneaux" },
        { name: "G | Cybersecurity", username: "gilbertsanchz" },
        { name: "Vibe Coding FM", username: "vibecoding_fm" },
        { name: "Cyber Psych with Connor", username: "cyberpsychwithconnor" },
        { name: "Three Headed Beast Security", username: "threeheadedbeastsecurity" },
        { name: "Jonathan @ CTech-Academy", username: "jonathanctech" },
        { name: "Data Formatter", username: "dataformatter" },
        { name: "SANS Institute", username: "sansinstituteofficial" },
        { name: "Preponderant Cyber Guy", username: "cyber_keelow" },
        { name: "Black Cyber", username: "black_cyber" },
        { name: "Ash On Cyber", username: "ashoncyber" },
        { name: "CISO Tradecraft", username: "cisotradecraft" },
        { name: "Covenant Training Center", username: "covenanttrainingc" },
        { name: "FLEX!", username: "iamriflex" },
        { name: "Spatix Networks", username: "spatixnetworks" },
        { name: "WatchGate", username: "watchgate" },
        { name: "TechStep", username: "techstep_cyber" },
        { name: "AnonHack3r", username: "anonhack3r1337" },
        { name: "TCM Security", username: "tcmsecurity" },
        { name: "Cybersecurity Girl", username: "cybersecuritygirl" },
        { name: "HackNotice", username: "hack_notice" },
        { name: "GC+ CISO Connection", username: "gcciso.connection" },
        { name: "Nate Butler Explains", username: "natebutlerexplains" },
        { name: "Just a girl in Cyber", username: "oladunni_cyber" },
        { name: "Ashish Rajan", username: "hashishrajan" },
        { name: "CyberDad", username: "cyberdad71" },
        { name: "PJ Catalano", username: "pj.catalano" },
        { name: "David Campbell", username: "dcam_ai" },
        { name: "Phil", username: "notppphil" },
        { name: "ACE | Govtech", username: "acewitdaspade" },
        { name: "Nigelb Tech", username: "nigelbtech" },
        { name: "SECURE | CYBER CONNECT", username: "secure.cyber.connect" },
        { name: "Professor Whiz", username: "ysenhunt25" },
        { name: "Cyber & Seth", username: "cyber.and.seth" },
        { name: "Riann Stroud", username: "riann.stroud" },
        { name: "Cyber Awareness Hub", username: "cyberawarenesshub" },
        { name: "Cyber Unc", username: "cyber__unc" },
        { name: "Cyber Secrets", username: "arescyberdefense" },
        { name: "Jay | Cybersecurity", username: "jaybytebank" },
        { name: "Cloud Sec Ninja", username: "cloudsecninja" },
        { name: "The Cyber Circle", username: "thecybercircle" },
        { name: "Brad Tech", username: "techbrad" },
        { name: "Nana | IT Fundamentals", username: "techworldwithnana" }
    ];

    const container = document.getElementById('cyberProfiles');
    const searchBox = document.getElementById('tiktokSearch');
    const countEl = document.getElementById('tiktokCount');

    function renderProfiles(filter = "") {
        container.innerHTML = "";
        const filtered = profiles.filter(p =>
            p.name.toLowerCase().includes(filter.toLowerCase()) ||
            p.username.toLowerCase().includes(filter.toLowerCase())
        );

        countEl.textContent = filtered.length + ' account' + (filtered.length === 1 ? '' : 's');

        if (!filtered.length) {
            container.innerHTML = '<p class="eo-dir-empty">No accounts match your search.</p>';
            return;
        }

        filtered.forEach(profile => {
            const card = document.createElement('a');
            card.href = `https://www.tiktok.com/@${profile.username}`;
            card.target = "_blank";
            card.rel = "noopener noreferrer";
            card.className = "eo-dir-card";
            card.innerHTML = `
                <div class="eo-dir-card__name">${profile.name}</div>
                <div class="eo-dir-card__handle">@${profile.username}</div>
            `;
            container.appendChild(card);
        });
    }

    searchBox.addEventListener('input', (e) => renderProfiles(e.target.value));

    // Initial render
    renderProfiles();
})();
