import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Typography, ImageList, ImageListItem, Chip, Card, CardHeader, CardContent } from "@mui/material";
import StyledRating from '../Components/StyledRating'

export default function Recipe({ match }) {
  // const {
  //   params: { RecipeId },
  // } = match;

  // const [isLoading, setIsLoading] = useState(true);
  // const [data, setData] = useState();

  // useEffect(() => {
  //   fetch(`http://localhost:3001/recipe/${RecipeId}`, {})
  //     .then((res) => res.json())
  //     .then((response) => {
  //       setData(response);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => console.log(error));
  // }, [RecipeId]);

  const recipe = {
    "RecipeId": 17475.0,
    "Name": "Cottage Cheese-Banana Breakfast Delite",
    "AuthorId": 27395,
    "CookTime": 180,
    "PrepTime": 300,
    "TotalTime": 480,
    "Date": "2002-01-18",
    "Description": "My own creation...I eat this EVERY day for breakfast. Very healthy, low-fat/cal, and filling (especailly when using whole-wheat bread). Also a great breakfast for diabetics",
    "Images": [
        "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/17/47/5/picbma8rw.jpg",
        "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/17/47/5/picLIVEDd.jpg",
        "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/17/47/5/picPPXDe7.jpg",
        "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/17/47/5/piclqTMmX.jpg"
    ],
    "Category": "Breakfast",
    "Keywords": [
        "Cheese",
        "Fruit",
        "< 15 Mins",
        "Beginner Cook",
        "Easy"
    ],
    "Ingredients": [
        "English muffins",
        "banana",
        "low fat cottage cheese",
        "fat-free cottage cheese",
        "sugar substitute",
        "ground cinnamon"
    ],
    "AggregatedRating": 5.0,
    "ReviewCount": 63,
    "Calories": 157.6,
    "FatContent": 1.8,
    "SaturatedFatContent": 0.7,
    "CholesterolContent": 5.7,
    "SodiumContent": 187.6,
    "CarbohydrateContent": 30.0,
    "FiberContent": 3.1,
    "SugarContent": 17.3,
    "ProteinContent": 8.0,
    "Servings": 1.0,
    "Yield": null,
    "Instructions": [
        "Toast bagel, english muffin, or bread.",
        "Top with sliced banana.",
        "Spread cottage cheese evenly over top.",
        "Sprinkle sugar substitute and cinnamon over top.",
        "ENJOY!"
    ],
    "URL": "https://www.food.com/recipe/cottage-cheese-banana-breakfast-delite-17475",
    "AuthorName": "Manda",
    "Reviews": [
        "{5 stars, Mary Scheffert} I am always looking for new ideas for breakfast, especially those that are low fat & filling.  I bought oat bran English muffins as I couldn't find whole wheat.  Give this one a try -- I never thought of cottage cheese as a breakfast food, but this was very good! -M",
        "{5 stars, sherrill tello} this recipie was delicious!! At first I thought it sounded a little strange, so I tried it before I fixed it for my 8 year old daughter and loved it, so I fixed it for her, and she loved it too!!\r\nTRY IT!!!            Sherrill Tello",
        "{5 stars, Happyfrog} Yummy yummy yummy",
        "{5 stars, skat5762} I'm not a big fan of raw cottage cheese, but thought I would give this recipe a shot anyway.  I'm so glad I did!  I used just 1/2 of a regular sized cinnamon bagel, added the banana and cheese, and sprinkled with cinnamon and real sugar.  Pure heaven.  Not a heavy meal at all, but substantial enough to keep me running full-blast on a morning when I didn't (gack!) have any coffee.  Thanks Manda for a great recipe!!",
        "{5 stars, dale7793} This is really good! I'm eating mine as I type as a late dinner. I can't wait to try it as breakfast. It's very tasty and filling and fast to make. I used toast for mine and no sweetener.",
        "{5 stars, Shari2} This is very good Manda.  It is filling, I used the cinnamon-raisin english muffins.  I didn't have any bananas and it still was good, next time I'll use the bananas.  Thanks for posting.",
        "{5 stars, Nikki C.} I am on Weight Watchers and I love this for breakfast. It turned out to only be 3 points and is pretty filling. I only had rye bread in the house at the time so I tried it and it was delightful!!! I have passed this recipe on to several people this week alone. Its terrific. Thanks for sharing your idea!!!",
        "{5 stars, TheDancingCook} A healthy on-the-go (or not) breakfast!  I used low fat cottage cheese and low fat english muffins.  Thanks for the recipe!",
        "{5 stars, Mysterygirl} I have to put my 2 cents worth in here.  Because of comments in the discussion forums, I decided to give this one a try, even though I am not a cottage cheese eater.  This was really good.  I liked the flavor and the cinnamon and sweetner made the cottage cheese very tasty.  Especially with the banana and cinnamon/raisin bagel that I put it on.  Thanks for posting this one.",
        "{5 stars, CherylL.} I thought it sounded horrible, but tried it anyway because of all the ratings.  I was surprised that it was actually good.  I eat this for breakfast a couple times a week now.",
        "{5 stars, buttercup0009} When I read this recipe I didn't think it would be good.  It sounded so easy though and it had alot of good ratings so I gave it a try. I made it on a reg. Eng. muffin yesterday for breakfast and a rasin bagel this morning. This is addictive and very filling!!! I like mine sweet, so I added a lot of cinnimin sugar spice to mine! I can't believe no one ever thought of putting cottage cheese on their bagel before.  I used the fat free kind and it tasted wonderful!  This is a very healthy breakfast!  Thanks for sharing it! Definitely better and more filling than cereal!",
        "{3 stars, Juliann} I was really excited about trying this recipe because of all the great reviews.  It wasn't BAD but I thought adding the cottage cheese was the worst part of the sandwich.  It destroyed the texture and made the taste too bland.  Interesting but I don't think a keeper...",
        "{5 stars, stacylu} I love cottage cheese and am always looking for some different breakfast ideas. Needless to say, I loved this. It's very filling and hit the spot!",
        "{5 stars, BothFex} My Aunut has been eating something similiar to this for years only she uses ricotta and strawberries.  I loved this version and eat it with whole wheat toast and LOTS of cinnamon!  This is only 3-3.5 points (depending on bread) for Weight Watchers.  Thanks for another winner Manda!",
        "{5 stars, jellie} I forgot to add the cinnamon and used brown sugar in lieu of the sweetener...I also blend my ingredients before adding them to the bread; make sure to stir well.  I ate most of it with a spoon before I could get it on the bread...A++ in a pita or tortilla too!  I'm going to take my old bananas from the freezer (saved for banana bread, rarely used) and mash them up for this recipe.",
        "{5 stars, riffraff} New favorite at our house!  This makes a great snack/dinner when I get home late too.",
        "{5 stars, nomnom} I tried this today because they were out of egg whites for my usual omelete at the dining hall and because I need the protein. I used toasted whole wheat bread (the end pieces - I like crusty bread) and used a LOT of cinnamon (however, next time I'll use more...yes, I do LOVE cinnamon - what gave you THAT idea? ;). I have to say that at first bite, I wasn't impressed, but then I kept eating. THEN I had a *2nd* one!! Oh it's so nummy. From now on, when they're out of egg whites, this will be my next best alternative. Thank you for adding a little more variety to my breakfasts! :D It tastes almost like a banana cannoli. Num! The recipe also reminds me of MY recipe \"My Daily Bagel Breakfast\" #47038. **UPDATE**: I tried this again, but subbed FRESH PINEAPPLE and it was DELISH! It added complexity in texture from the pineapple itself and because the natural juice softens the top layer of toasted bread slightly - which I like. Hope to try with other fruits :)",
        "{5 stars, mama dean} Took me a couple of days to work up the courage to try this, but it is REALLY good! I've been trying to find a way to have protein for breakfast without cooking eggs. I used an english muffin. The sweetness of the banana really balances the cottage cheese. Yummy!",
        "{5 stars, Sherri35} I have never cared for cottage cheese before, but I wanted to try this after all the great reviews.  I used whole wheat toast and regular sugar instead of sweetener and I loved it!  I am definitely going to have this for breakfast often.  Thanks!",
        "{5 stars, LeahMarie} This was really quick, yummy and nutritious...I used blueberry English muffins, and it was very tasty. We had this for breakfast two days in a row!  Thanks for posting!",
        "{5 stars, varinialuvsrichard} Wow! this is so good and so easy to make.  I didn't think I was going to like it, but with this many reviews I said lets try it, and it was so delicious.  I give it 2 thumbs up! -varinia",
        "{5 stars, Bonnie  Shortie Ris} I tried this for breakfast this morning and I was delighted. It was very easy and tasty. I don't like breakfast and am always looking for new ideas that are different and this fits the bill. Thank you for a great idea.",
        "{5 stars, Steph_40135} My husband LOVES cottage cheese, so when I saw all the great reviews I made sure to buy the ingredients for this. He really enjoyed it on Cinnamon Raisin English Muffins, tho he confessed it would be more filling on a bagel.  Thanks for a great breakfast idea!! Steph",
        "{3 stars, Linda Owen} My husband found this a good breakfast idea. We made two halves of the bagel each. (too filling) One is adequate. I found it a little soggy for my taste. I recommend not putting cottage cheese on a warm toasted bagel. Makes the cottage cheese too runny.",
        "{5 stars, Jellyqueen} This was recommended to me for my daughter who has low blood sugar.  This is wonderfull.  I have a feeling it will be a regular around my household!!!  Thanks for the great recipe.",
        "{5 stars, Theresa P} This was GREAT !! I really loved it . I used a whole wheat english muffin and 1% cottage cheese . This makes a fantastic breakfast and I WILL be making it a regular for sure !!!",
        "{5 stars, BestTeenChef} This was simple but delcious! Its a great way to spice up your raisin bread in the morning!",
        "{0 stars, Soobeeoz} I sometimes have spicy fruit muffins with banana for breakfast, but hadn't thought to add cottage cheese.  I've eaten it the past two mornings using toasted fruit & spice loaf as the base and liked it very much.  It's healthy, substantial and ideal for those with a sweet tooth who find it hard to eat breakfast.  It's also an easy way to add a little extra protein to one's diet. Yesterday I used sugar in place of the sweetener, and today tried it with a drizzle of honey which was even nicer.",
        "{0 stars, Sewwhatsports} I have done this with ricotta cheese and it is a little less soggy at times.  Mix the cheese with the sweetener and cinnamon, top the bread and fruit and stick under the broiler for a few minutes until it is bubbly.  Makes it like a cheese danish.",
        "{5 stars, vitalev} I love this for breakfast!  Sometimes I add a little bit of peanut butter and let it melt on the bread first.  Soooooo good!!",
        "{5 stars, teresas} Excellent! Excellent! Excellent! This is so easy and good. I really enjoy breakfast now. I have tried it with the peanut butter and that is my favorite way, but don't plan to eat it like that all the time. (isn't that how Elvis got fat?) Thanks, Manda for posting the delicious dish.",
        "{5 stars, SeeClaireCook} Well, I was out of bananas because I had used them all to make bread.  Sooo.. I tried this simple breakfast over a thick slice of that homemade, whole wheat banana sour cream bread and oh my was it a treat! Next time I will use an english muffin and make sure I have an actual banana on hand!",
        "{5 stars, HannahBoBana} I have to say that I was a bit skeptical but I thought, why not? Let's see. LOVED IT!!!!!!",
        "{4 stars, Atheist Cook} I made this for my 8yr old daughter as she is getting tired of the usual breakfasts.  She loved loved loved it. We substituted a little maple syrup for the sugar substitute as she loves maple syrup.  We will be making this one often.",
        "{4 stars, seesko} This wasn't bad!  It was definatly different.  I have to give it four stars because of the ease and healthy aspect of it.  To be honest I probably won't make it again.  Only because i would rather have these items seperatly than layered on top of each other.  It really is a healthy start to the day.",
        "{5 stars, Lizzybob} Great quick breakfast. Nice way to sneak in some protein for breakfast!  Update: I tried Ricotta Cheese & it was even better!",
        "{5 stars, Baykes} i tried this on Ezekiel bread (basically healthy sprout bread) and with xylitol ( a sugar substitute) and it was absolutely delicious.",
        "{5 stars, katenawrocki} This was VERY tasty, will have this on a regular basis with my morning coffee, Thanks for posting!",
        "{4 stars, angelashley} I used to eat a very similar recipe for breakfast. My only changes were that I used to broil/microwave the combination so the cheese would melt a bit and then I'd usually skip the sugar. A classic!",
        "{5 stars, MechanicalJen} Wow!  This recipe is deceptively filling.  I've always harrumphed english muffins at the store, looking so puny.  I need my breakfast to hold me over until lunch!  \r\n\r\nManda, thanks for making my breakfast a little more exciting than a plain bagel.\r\n\r\nAs a side note, I can see it being very easy to play with the topping, here.  I'm thinking of using pumpkin pie spice for tomorrow.  A mixture of cocoa powder and splenda could have potential, as well.",
        "{5 stars, Plumshadow} I will agree with the others, the breakfast will leave you border line stuffed!!!  It was pretty good, very quick and healthy (especially if you use whole wheat bagals/eglish muffin).",
        "{4 stars, Seasons} My son loves this....we use regular sugar no low fat cottage cheese.  It's been great for the weekends.  A good treat!",
        "{4 stars, Peachie Keene} I really don't like bananas, but I am always trying to find a way to get them into my weekly routine. This way is absolutely wonderful! But it is VERY filling - Next time I will only use HALF of my english muffin and save the other half for the next time. I just couldn't eat both (for myself). I also used Honey instead of sugar substitute and I used 4% Cottage Cheese. Four stars only because of my banana preference :)",
        "{5 stars, Miss Angie} This is my favorite breakfast food of all time!! I've been making it all through college :) I usually use frozen banana slices on top of the cottage cheese. If your banana is ripe, you can skip the sugar. Mmmmm! I think I'll make this tomorrow!",
        "{5 stars, frozen_rain} I absolutely love this idea! I usually make it on whole wheat bread...it's like dessert for breakfast! Yum! And it's so filling!",
        "{5 stars, hungry4more} It is surprising how tasty something so simple can be. Thanks for the recipe.",
        "{5 stars, veggie_mama} Quick, easy and delicious.  I didn't add sweetener, and I  didn't miss it.  The bananas were sweet enough. The cinnamon really makes this great.  This will be a regular breakfast and snack from now on.",
        "{5 stars, slickchick} Was sitting here looking at recipes and knowing I needed to get up to get something to eat and I looked at the menu I have for my daughter and saw this.  I just got done eating this and I loved it!!!  Easy, simple and lots of flavor.  I heard on the Ellen show that cinnamon is good for you, so I have been using it a lot more.  This is a great way to add it. Thanks Manda for coming up with such a great creation:)",
        "{5 stars, Greeny4444} I thought cottage cheese on bread sounded really weird, but this is REALLY good! I used one piece of toasted wheat bread, and I followed everything else to the letter, just piling everything on one piece of bread. I would've never concocted this myself, but I will definitely be having it for breakfast more often. Thanks for posting it, Manda!",
        "{5 stars, ShortieNJ} Wow...something you think will be weird...tastes really good.  The only thing i will change next time is to put the cottage cheese directly on the toast, so it's not so cold and distinctly different from the rest of the meal",
        "{5 stars, CandinZach} I can't believe I haven't rated this yet! I have eaten this at least four times a week for several months, and I still look forward to eating it in the morning. This is so delicious and easy, it has really been a lifesaver for me. Thank you so much!",
        "{0 stars, jrusk} I was delighted to find this recipe. My usual snack is cottage cheese, splenda and cinnamon. I just added the banana this morning and it was really good. I would have never thought to add it, yum...Thanks Manda!",
        "{5 stars, merrilife} This was really so much better than I would have ever thought. I like cottage cheese, but would have never thought to use it like this! Thanks so much. (I can't imagine eating anything every day, but this will be in the rotation nonetheless!",
        "{4 stars, LUVMY2BOYS} Very awesome & delicious! I loved all the ingredients. I make a \"cinnamon whole wheat tortilla\" for myself in the mornings, so I used this for a sweet & creamy filling. Like a danish, but healthy  as well! Thanks so much for sharing this great creation.",
        "{3 stars, Bittersweetened} I was anxious to try this recipe since I love all the ingredients individually. My dh and I did not feel that the flavors complimented each other. I was hoping to like this since we are always on the look out for healthy meals. I am sure it is just our own preferences since it seems to be received well by others. Sorry for not liking it, we will probably not be making this again.",
        "{5 stars, Laura_Ozz} I found this recipe yesterday and tried it this morning and loved it!  I just didn't have any sugar substitute so sprinkled sugar very sparingly and used toasted wheat bread slices.  Delicious!!  Thank you for sharing this yummy use for cottage cheese and bananas!!",
        "{5 stars, lovelysoulthief} i liked this quite a bit, though i did change it to be... less healthy.  using what was on hand, i had toasted sourdough bread, and used whole milk ricotta cheese in place of cottage cheese.  next time i may try strawberries instead of bananas.",
        "{5 stars, Dawni} Amazingly simple but very yummy!\nThis fills you up and you are not hungry for quite a while.  I use whole wheat english muffins.\nThanks for the great idea!!",
        "{4 stars, Heather W.} Quite tasty, light and quick.  I avoid using artificial sweeteners, so I just left it out and still tasted good.  If you wanted sweet, you could drizzle a very tiny bit of honey....and wouldn't change the calorie count significantly...but I don't think it is necessary.   Oh, and I made mine on mini bagels.",
        "{4 stars, havent the slightest} Very nice. I used a whole wheat english muffin and honey instead of cinnamon. I put the cottage cheese on first, then added sliced banana, topped with some drizzled honey. A tasty, healthy breakfast that I will definitely make again!",
        "{5 stars, PatriotsGirl} I've recently discovered that I love cottage cheese. I've avoided it my entire life of 31 years without ever trying it, just assuming I wouldn't like it.  I decided to give it a whirl recently, and while I don't care for it straight out of the carton, I LOVE it when used in a sweeter dish like this.  I used two low fat, whole grain waffles for this, added the sliced bananas on top, and then mixed the cottage cheese, splenda and cinnamon all together before putting on top of the bananas.  I loved it from the very first bite!  This is probably the healthiest, most filling breakfast I can think of.  I eat these a few times a week now, thanks so much for this fabulous and simple recipe!",
        "{4 stars, lil_ms_priss86_} Tasty. I admit, I was skeptical of this recipe...the cottage cheese with the sweetener...but this is Healthy AND Delicious! I shared this recipe with others. I also have added berries, too, for a little something extra.... But don't leave out the banana-the banana makes this recipe! I will definitely make this  again. Thanks for sharing.",
        "{5 stars, Lucky in Bayview} What a nice surprise! I didn't expect to like this near as much as I did. I used whole wheat English muffins and drizzled honey instead of using sweetener. It was delicious and kept me full for hours. Thanks for sharing this healthy, delicious recipe. I'll be making this often."
    ]
  }

  const parseReview = (string) => {
    const stars = parseInt(string.substring(1,string.indexOf(" ")))
    const username = (string.substring(string.indexOf(",")+1, string.indexOf("}"))).trim()
    const review = (string.substring(string.indexOf("}")+1)).trim()
    return {stars: stars, username: username, review: review}
  }

  return (
    <Container sx={{padding: 2}} maxWidth="lg">
      <Grid container spacing={2} justifyContent="space-around">
        <Grid item xs={12}>
          <Typography variant="h3" color="secondary">{recipe.Name}</Typography>
        </Grid>
        <Grid container item direction="row" spacing={1}>
          {Array.from(recipe.Keywords).map((value, idx)=> (
            <Grid item key={idx}>
              <Chip label={value} color="primary" size="large"/>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">{recipe.Description}</Typography>
        </Grid>
        <Grid sx={{mt: 2}} item xs={6}>
          <Typography variant="h4" color="secondary">Nutritional Information</Typography>
          <Grid container direction="column" alignItems="flex-start">
            <Grid item xs={12}>
              <Typography variant="h6" color="secondary">Calories: {recipe.Calories}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color="secondary">Total Fat: {recipe.FatContent} g</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color="secondary">Saturated Fat: {recipe.SaturatedFatContent} g</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color="secondary">Cholestorol: {recipe.CholesterolContent} mg</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color="secondary">Sodium: {recipe.SodiumContent} mg</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color="secondary">Total Carbohydrate: {recipe.CarbohydrateContent} g</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color="secondary">Dietary Fiber: {recipe.FiberContent} g</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color="secondary">Sugars: {recipe.SugarContent} g</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color="secondary">Protein: {recipe.ProteinContent} g</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{mt: 2}} container item xs={6} direction="column" alignItems="flex-start">
          <Grid item>
            <Typography variant="h4" color="secondary">Instructions</Typography>
          </Grid>
          <Grid item container direction="column" alignItems="flex-start">
            {Array.from(recipe.Instructions).map((value, idx)=> (
              <Grid item key={idx}>
                <Typography variant="h6" color="secondary" >{idx+1}. {value}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item>
          <ImageList gap={12} cols={4} style={{padding: 10}}>
            {recipe.Images.map((item, idx) => (
              <ImageListItem key={idx} >
                <img
                  style={{boxShadow: '3px 3px 3px rgba(0,0,0,0.5)'}}
                  src={`${item}`}
                  srcSet={`${item}`}
                  alt={recipe.Name}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid item container direction="column" alignItems="flex-start">
          <Typography variant="h4" color="secondary">Reviews: </Typography>
          <Grid container spacing={4} direction="column" alignItems="flex-start">
            {Array.from(recipe.Reviews).map((value, idx) => {
              const obj = parseReview(value)
              return (<Grid item key={idx} sx={{width: 1}} >
                        <Card style={{backgroundColor: "white"}}>
                          <CardHeader style={{color: "#344966"}} title={obj.username}/>
                          <CardContent style={{paddingTop: 0}}>
                            <StyledRating readOnly value={obj.stars}/> 
                            <Typography variant="h6" color="secondary">{obj.review}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>)
            })}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};