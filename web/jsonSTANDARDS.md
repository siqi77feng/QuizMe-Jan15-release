#JSON Standards

###Style
Follow the [Google JSON Style Guide](https://google.github.io/styleguide/jsoncstyleguide.xml#Property_Name_Format) when creating new properties.  

The current JSON object for questions is as follows.
```javascript
{
   "fillInTheBlank": [
      {
         "sentence": "Caffeine is a bitter [[0]] found in the beans, leaves, and fruits of plants, where it acts as a [[1]].",
         "keys": [
            "psychoactive drug",
            "natural pesticide"
         ]
      },
      {
         "sentence": "A [[0]] is the “crash” that results when the drug loses its effectiveness and the activity of the  neurotransmitters returns to normal.",
         "keys": [
            "major problem"
         ]
      }
   ]
}
```



###questions
Each fillInTheBlank object has a "sentence" property and "keys" property. The sentence property value is a string, and placeholders for keys are in the format [[i]], where i is the index of the key in the keys array. Other types of question obejects other than fill in the blank can be added later if desired.

In the example below, the sentence with all blanks filled in is: "Caffeine is a bitter psychoactive drug found in beans, leaves, and fruits of plants, where it acts as a natural pesticide."

```javascript
{
         "sentence": "Caffeine is a bitter [[0]] found in the beans, leaves, and fruits of plants, where it acts as a [[1]].",
         "keys": [
            "psychoactive drug",
            "natural pesticide"
         ]
      }
```
