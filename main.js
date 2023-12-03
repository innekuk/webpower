const express = require('express')
const fs = require('fs')
const qs = require('querystring')
const app = express()
const port = 3000
const template = require('./template.js')
const mysql      = require('mysql2');
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'nba'
});

db.connect();
app.use(express.static(__dirname));

app.get('/', (req, res)=>{
    console.log(__dirname+'/nba.png')
    let {name} = req.query
    db.query('SELECT * from games', (err, teacher)=>{
        if (err) throw err;
        //console.log(teacher);
        let list = template.list(teacher)
        let data, control
        if(name == undefined){
            name = 'NBA'
            data = `NBA는 미국과 캐나다의 30개의 팀으로 이루어져 있는 전 세계 최고의 프로 농구 리그이자<br>
            모든 농구선수들의 꿈의 무대이며 NBA 리그를 운영하는 미국의 프로 농구 협회다. <br>
            타 종목의 프로 리그가 어느 정도 대등하게 대결하고 선수를 교류하는 반면 NBA는 그야말로 압도적인 1강의 농구 프로리그다. <br>
            이 협회는 아시아(홍콩 및 필리핀), 아프리카, 중국, 캐나다 등지에 총 7개의 현지 사무국을 두고 있다.<br>`
            control = `<a href="/create" class="button">create</a>`
            const html = template.HTML(name, list, `<h2>${name} 페이지</h2><p>${data}</p>`, control)
            res.send(html)
        }else{
            db.query(`SELECT games.ftname,games.id ,games.gamehighlight, games.stname , games.ftscore , games.stscore , team1.ace as ace1, team2.ace as ace2 , team1.longname as ftlongname , team2.longname  as stlongname FROM games 
            JOIN team AS team1 ON games.ftname = team1.teamname 
            JOIN team AS team2 ON games.stname = team2.teamname 
            WHERE games.id = ?`, [name],(err2, game)=>{
                console.log(game)
                const ftname = game[0].ftname;
                const stname = game[0].stname;
                const ftscore = game[0].ftscore;
                const stscore = game[0].stscore;
                const ftlongname = game[0].ftlongname;
                const stlongname = game[0].stlongname;
                const ftace = game[0].ace1;
                const stace = game[0].ace2;
                const highlight = game[0].gamehighlight;
                name = `${ftname} vs ${stname}`
                data = template.table(ftlongname,ftscore , stlongname , stscore , ftace , stace,highlight);
                control = `<form action="delete_process" method="post">  <!-- 링크로 이동하지 않고 바로 삭제 구현 -->
                <input type='hidden' name='id' value='${game[0].id}'>
                <button type="submit" class="button">delete</button>
                </form>`
                db.query('SELECT * from player WHERE playerteam=?',[ftname], (err, playerdata1)=>{
                    let playerdatalist1 = template.playerlist(playerdata1)
                    db.query('SELECT * from player WHERE playerteam=?',[stname], (err, playerdata2)=>{
                        playerdatalist2 = template.playerlist(playerdata2)
                        const html = template.HTML(name, '', `<h2>${name} 페이지</h2><p>${data}</p> 
                        <h1>${ftlongname} players<h1>
                        ${playerdatalist1}
                        <h1>${stlongname} players<h1>
                        ${playerdatalist2}
                        ${control}<br><a href="/" class="button">back</a>`, '')
                        res.send(html)
                    })
                })
            })
        }        
    })
})

app.get('/create', (req, res)=>{
    db.query('SELECT * from games', (err, teacher)=>{
        if (err) throw err;
        const name = 'create'
        const list = template.list(teacher)
        const data = template.create()
        const html = template.HTML(name, list, data, '')
        res.send(html)
    })
})

app.get('/team', (req, res)=>{
    let {name} = req.query
        if(name === undefined){
            name = 'NBATEAM'
            data = `<ul class="teamlist">
                        <a href="/team?name=ATL" class="teamname"><li value="ATL">Atlanta Hawks</li></a>
                        <a href="/team?name=BKN" class="teamname"><li value="BKN">Brooklyn Nets</li></a>
                        <a href="/team?name=BOS" class="teamname"><li value="BOS">Boston Celtics</li></a>
                        <a href="/team?name=CHA" class="teamname"><li value="CHA">Charlotte Hornets</li></a>
                        <a href="/team?name=CHI" class="teamname"><li value="CHI">Chicago Bulls</li></a>
                        <a href="/team?name=CLE" class="teamname"><li value="CLE">Cleveland Cavaliers</li></a>
                        <a href="/team?name=DAL" class="teamname"><li value="DAL">Dallas Mavericks</li></a>
                        <a href="/team?name=DEN" class="teamname"><li value="DEN">Denver Nuggets</li></a>
                        <a href="/team?name=DET" class="teamname"><li value="DET">Detroit Pistons</li></a>
                        <a href="/team?name=GSW" class="teamname"><li value="GSW">Golden State Warriors</li></a>
                        <a href="/team?name=HOU" class="teamname"><li value="HOU">Houston Rockets</li></a>
                        <a href="/team?name=IND" class="teamname"><li value="IND">Indiana Pacers</li></a>
                        <a href="/team?name=LAC" class="teamname"><li value="LAC">LA Clippers</li></a>
                        <a href="/team?name=LAL" class="teamname"><li value="LAL">LA Lakers</li></a>
                        <a href="/team?name=MEM" class="teamname"><li value="MEM">Memphis Grizzlies</li></a>
                        <a href="/team?name=MIA" class="teamname"><li value="MIA">Miami Heat</li></a>
                        <a href="/team?name=MIL" class="teamname"><li value="MIL">Milwaukee Bucks</li></a>
                        <a href="/team?name=MIN" class="teamname"><li value="MIN">Minnesota Timberwlives</li></a>
                        <a href="/team?name=NOP" class="teamname"><li value="NOP">New Orleans Pelicans</li></a>
                        <a href="/team?name=NYK" class="teamname"><li value="NYK">New York Knicks</li></a>
                        <a href="/team?name=OKC" class="teamname"><li value="OKC">Oklahoma City Thunder</li></a>
                        <a href="/team?name=ORL" class="teamname"><li value="ORL">Orlando Magic</li></a>
                        <a href="/team?name=PHI" class="teamname"><li value="PHI">Philadelphia 76ers</li></a>
                        <a href="/team?name=PHX" class="teamname"><li value="PHX">Phoenix Suns</li></a>
                        <a href="/team?name=POR" class="teamname"><li value="POR">Portland Trail Blazers</li></a>
                        <a href="/team?name=SAC" class="teamname"><li value="SAC">Sacramento Kings</li></a>
                        <a href="/team?name=SAS" class="teamname"><li value="SAS">San Antonio Spurs</li></a>
                        <a href="/team?name=TOR" class="teamname"><li value="TOR">Toronto Raptors</li></a>
                        <a href="/team?name=UTA" class="teamname"><li value="UTA">Utah Jazz</li></a>
                        <a href="/team?name=WAS" class="teamname"><li value="WAS">Washington Wizards</li></a>
                    </ul>
                    `
            const html = template.HTML(name, ``, `<h2>${name} 페이지</h2><p>${data}</p><br><a href="/" class="button">back</a>`, ``)
            res.send(html)
        }
        else{
            db.query('SELECT * from games WHERE ftname=? or stname=?',[name,name], (err, teamgame)=>{
                console.log(teamgame)
                let list;
                if (teamgame != undefined){
                    list = template.list(teamgame)
                }
                else{
                    list = ``
                }
                if (err) throw err;
                db.query('SELECT * from team WHERE teamname=?',[name], (err, teamdata)=>{
                    if (err) throw err;
                    console.log(teamdata)
                    let title = teamdata[0].longname
                    db.query('SELECT * from player WHERE playerteam=?',[name], (err, playerdata)=>{
                        let data = template.playerlist(playerdata)
                        const html = template.HTML(title, list, `<h2>${title}</h2><p>${data}</p><br><a href="/" class="button">back</a>`, ``)
                        res.send(html)
                    })
                })               
            })
        }
})

app.get('/update', (req, res)=>{
    let {name} = req.query
    db.query('SELECT * from games', (err, teacher)=>{
        if (err) throw err;
        let list = template.list(teacher)
        db.query('SELECT * from teacher where id=?',[name], (err2, teacher2)=>{
            if (err2) throw err2;
            name = teacher2[0].name;
        //fs.readFile(`page/${name}`, 'utf8', (err,content)=>{
            let control = `<a href="/create">create</a> <a href="/update?name=${teacher2[0].id}">update</a>
            <form action="delete_process" method="post">  <!-- 링크로 이동하지 않고 바로 삭제 구현 -->
                <input type='hidden' name='id' value='${teacher2[0].id}'>
                <button type="submit" >delete</button>
            </form>
            `
            const data = template.update(teacher2[0].id,name, teacher2[0].subject)
            const html = template.HTML(name, list, `<h2>${name} 페이지</h2><p>${data}</p>`, control)
            res.send(html)  
        })
    })
})
app.post('/create_process', (req, res)=>{
    let body = ''
    req.on('data', (data)=>{
        body = body + data
    })
    req.on('end', ()=>{
        const post = qs.parse(body)
        const ftname = post.ftname;
        const stname = post.stname;
        const ftscore = post.ftscore *1;
        const stscore = post.stscore * 1;
        const gamehighlight = post.gamehighlight;
        // fs.writeFile(`page/${title}`, description, 'utf8', (err)=>{
        //     res.redirect(302, `/?name=${title}`)
        // })
        db.query(`insert into games (ftname, ftscore, stname, stscore , gamehighlight)
         values (?, ?, ?, ?, ?)`, [ftname, ftscore, stname, stscore , gamehighlight], (err, result)=>{
            if (err) throw err;
            res.redirect(302, `/`)
        })
    })
})
app.post('/update_process', (req, res)=>{
    let body = ''
    req.on('data', (data)=>{
        body = body + data
    })
    req.on('end', ()=>{
        const post = qs.parse(body)
        const id = post.id
        const title = post.title
        const description = post.description
        db.query(`UPDATE TEACHER set name=? , subject=?
                  WHERE id=?`, 
                  [title, description, id], (err, result)=>{
            if (err) throw err;
            res.redirect(302,`/?name=${id}`)
         })
        // fs.rename(`page/${id}`, `page/${title}`, (err)=>{  // 파일명 변경 시 처리
        //     fs.writeFile(`page/${title}`, description, 'utf8', (err)=>{
        //         res.redirect(302, `/?name=${title}`)
        //     })    
        // })
    })
})
app.post('/delete_process', (req, res)=>{
    let body = ''
    req.on('data', (data)=>{
        body = body + data
    })
    req.on('end', ()=>{
        const post = qs.parse(body)
        const id = post.id
        db.query(`DELETE FROM games 
                  WHERE id=?`, 
                  [id], (err, result)=>{
            if (err) throw err;
            res.redirect(302, `/`);
        })
        // fs.unlink(`page/${id}`, (err)=>{  // 파일 삭제 처리
        //     res.redirect(302, `/`)  //  삭제 후 홈으로 redirect
        // })
    })
})
app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})




