module.exports = {
    HTML: function (name, list, body, control) {
        return `
            <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${name}</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <div class="d1">
                <img src="./nba.png" class="nba_img">
                <h1 class="title">NBA</h1>
                <form action="/team" method="get">
                    <button type='submit' class="btn" > team </button>
                </form>
            </div>  
            
            ${list}
            ${control}
            ${body}
        </body>
        </html>
        `
    }, list: function (files) {
        let list = '<p>';
        if (files != null){
            list +='<h2>games</h2>';
        }
        for (i = 0; i < files.length; i++) {
            if (files[i].ftscore > files[i].stscore){
                list = list + `<div class="gamelist"><a href="/?name=${files[i].id}" style="text-decoration:none ; color:black" ><strong> ${files[i].ftname}:${files[i].ftscore}</strong> vs ${files[i].stname}:${files[i].stscore}</a></div><br>`
                }
            else{
                list = list + `<div class="gamelist"><a href="/?name=${files[i].id}" style="text-decoration:none ; color:black" >${files[i].ftname}:${files[i].ftscore} vs <strong>${files[i].stname}:${files[i].stscore}</strong></a></div><br>`
            }

            }
        list += '</p>';
        
        return list
    }, playerlist: function (files) {
        let list = '<p>';
        if (files != null){
            list +='<h2>player</h2>';
        }
        for (i = 0; i < files.length; i++) {
            list += `<div class="playerlist">${files[i].playername}</div><br>`;
        }
        list += '</p>';
        
        return list
    }, 
    create: function() {
        return `
        <form action="/create_process" method="post">
            <p>
                <select name="ftname">
                    <option value="ATL">Atlanta Hawks</option>
                    <option value="BKN">Brooklyn Nets</option>
                    <option value="BOS">Boston Celtics</option>
                    <option value="CHA">Charlotte Hornets</option>
                    <option value="CHI">Chicago Bulls</option>
                    <option value="CLE">Cleveland Cavaliers</option>
                    <option value="DAL">Dallas Mavericks</option>
                    <option value="DEN">Denver Nuggets</option>
                    <option value="DET">Detroit Pistons</option>
                    <option value="GSW">Golden State Warriors</option>
                    <option value="HOU">Houston Rockets</option>
                    <option value="IND">Indiana Pacers</option>
                    <option value="LAC">LA Clippers</option>
                    <option value="LAL">LA Lakers</option>
                    <option value="MEM">Memphis Grizzlies</option>
                    <option value="MIA">Miami Heat</option>
                    <option value="MIL">Milwaukee Bucks</option>
                    <option value="MIN">Minnesota Timberwolves</option>
                    <option value="NOP">New Orleans Pelicans</option>
                    <option value="NYK">New York Knicks</option>
                    <option value="OKC">Oklahoma City Thunder</option>
                    <option value="ORL">Orlando Magic</option>
                    <option value="PHI">Philadelphia 76ers</option>
                    <option value="PHX">Phoenix Suns</option>
                    <option value="POR">Portland Trail Blazers</option>
                    <option value="SAC">Sacramento Kings</option>
                    <option value="SAS">San Antonio Spurs</option>
                    <option value="TOR">Toronto Raptors</option>
                    <option value="UTA">Utah Jazz</option>
                    <option value="WAS">Washington Wizards</option>
                </select>   
                <input type="number" name="ftscore"></input>
                VS
                <select name="stname">
                    <option value="ATL">Atlanta Hawks</option>
                    <option value="BKN">Brooklyn Nets</option>
                    <option value="BOS">Boston Celtics</option>
                    <option value="CHA">Charlotte Hornets</option>
                    <option value="CHI">Chicago Bulls</option>
                    <option value="CLE">Cleveland Cavaliers</option>
                    <option value="DAL">Dallas Mavericks</option>
                    <option value="DEN">Denver Nuggets</option>
                    <option value="DET">Detroit Pistons</option>
                    <option value="GSW">Golden State Warriors</option>
                    <option value="HOU">Houston Rockets</option>
                    <option value="IND">Indiana Pacers</option>
                    <option value="LAC">LA Clippers</option>
                    <option value="LAL">LA Lakers</option>
                    <option value="MEM">Memphis Grizzlies</option>
                    <option value="MIA">Miami Heat</option>
                    <option value="MIL">Milwaukee Bucks</option>
                    <option value="MIN">Minnesota Timberwolves</option>
                    <option value="NOP">New Orleans Pelicans</option>
                    <option value="NYK">New York Knicks</option>
                    <option value="OKC">Oklahoma City Thunder</option>
                    <option value="ORL">Orlando Magic</option>
                    <option value="PHI">Philadelphia 76ers</option>
                    <option value="PHX">Phoenix Suns</option>
                    <option value="POR">Portland Trail Blazers</option>
                    <option value="SAC">Sacramento Kings</option>
                    <option value="SAS">San Antonio Spurs</option>
                    <option value="TOR">Toronto Raptors</option>
                    <option value="UTA">Utah Jazz</option>
                    <option value="WAS">Washington Wizards</option>
                </select>   
                <input type="number" name="stscore"></input>

                
            </p>
            highlight<input type="text" name="gamehighlight"></input>
            <p><button type="submit" class="button">Send</button></p>
        </form>
        <a href="/" class="button">back </a>
        `
    }, update: function(name, content) {
        return `
        <form action="/update_process" method="post">
            <p><input type="hidden" name="id" value="${name}"></p>
            <p><input type="text" name="title" placeholder="title" value="${name}"></p>
            <p><textarea name="description" placeholder="description">${content}</textarea></p>
            <p><button type="submit">Send</button></p>
        </form>
        `
    } , table: function(ftname , ftscore , stname , stscore , ace1, ace2 , highlight) {
        return `
        <div class="table-container">
            <table>
                <tr>
                    <td>${ftscore > stscore ? `<strong>${ftname}</strong>` : ftname}</td>
                    <td colspan="2">${ `${ftscore > stscore ? `<strong>${ftscore}</strong>` : ftscore} ${ftscore > stscore ? '>' : '<'} ${stscore > ftscore ? `<strong>${stscore}</strong>` : stscore}`}</td>
                    <td>${stscore > ftscore ? `<strong>${stname}</strong>` : stname}</td>
                </tr>
                <tr>
                    <td colspan="2"><span class="ace">${ace1}</span></td>
                    <td colspan="2"><span class="ace">${ace2}</span></td>
                </tr>
                <tr>
                    <td colspan="4"><a href="${highlight}" style="text-decoration:none ; color:black; font-size=30px"; target="_blank">highlight</a></td>
                </tr>
            </table>
        </div>
        `

    }
}


// module.exports = {
//     HTML: function (name, list, body, control) {
//         return `
//             <!DOCTYPE html>
//         <html lang="ko">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>${name}</title>
//         </head>
//         <body>
//             <h1><a href="/">선린인터넷고등학교</a></h1>
//             <!-- 메뉴 -->
//             ${list}
//             ${control}
//             ${body}
//         </body>
//         </html>
//         `
//     }, list: function (files) {
//         let list = '<ol>'
//         for (i = 0; i < files.length; i++) {
//             list = list + `<li><a href="/?name=${files[i].id}">${files[i].name}</a></li>`
//         }
//         list = list + '</ol>'
//         return list
//     }, create: function() {
//         return `
//         <form action="/create_process" method="post">
//             <p><input type="text" name="title" placeholder="name"></p>
//             <p><textarea name="description" placeholder="subject"></textarea></p>
//             <p><button type="submit">Send</button></p>
//         </form>
//         `
//     }, update: function(id,name, content) {
//         return `
//         <form action="/update_process" method="post">
//             <p><input type="hidden" name="id" value="${id}"></p>
//             <p><input type="text" name="title" placeholder="title" value="${name}"></p>
//             <p><textarea name="description" placeholder="description">${content}</textarea></p>
//             <p><button type="submit">Send</button></p>
//         </form>
//         `
//     }
// }