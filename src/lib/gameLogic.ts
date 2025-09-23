// Simple word validation - in a real game, this would use a comprehensive dictionary API
const VALID_WORDS = new Set([
  // Common 2-letter words
  'am', 'an', 'as', 'at', 'be', 'by', 'do', 'go', 'he', 'if', 'in', 'is', 'it', 'me', 'my', 'no', 'of', 'on', 'or', 'so', 'to', 'up', 'us', 'we',
  
  // Common 3-letter words  
  'ace', 'act', 'add', 'age', 'aid', 'aim', 'air', 'all', 'and', 'ant', 'any', 'app', 'arc', 'are', 'arm', 'art', 'ask', 'ate', 'bad', 'bag', 'bar', 'bat', 'bay', 'bed', 'bee', 'bet', 'big', 'bit', 'box', 'boy', 'bug', 'bus', 'but', 'buy', 'can', 'cap', 'car', 'cat', 'cow', 'cry', 'cup', 'cut', 'day', 'den', 'did', 'die', 'dig', 'dog', 'dot', 'dry', 'ear', 'eat', 'egg', 'end', 'eye', 'far', 'fat', 'few', 'fix', 'fly', 'for', 'fox', 'fun', 'gap', 'gas', 'get', 'got', 'gun', 'guy', 'had', 'hat', 'her', 'hey', 'hid', 'him', 'his', 'hit', 'hop', 'hot', 'how', 'hug', 'ice', 'job', 'joy', 'key', 'kid', 'lay', 'led', 'leg', 'let', 'lie', 'lit', 'log', 'lot', 'low', 'mad', 'man', 'map', 'mat', 'max', 'may', 'men', 'met', 'mix', 'mom', 'mud', 'net', 'new', 'nod', 'not', 'now', 'nut', 'odd', 'off', 'oil', 'old', 'one', 'our', 'out', 'own', 'pan', 'pat', 'pay', 'pen', 'pet', 'pie', 'pin', 'pit', 'pop', 'pot', 'put', 'ran', 'rat', 'raw', 'red', 'rid', 'row', 'rub', 'run', 'sad', 'sat', 'saw', 'say', 'sea', 'see', 'set', 'she', 'shy', 'sir', 'sit', 'six', 'sky', 'sob', 'son', 'sun', 'tag', 'tap', 'tax', 'tea', 'ten', 'the', 'tie', 'tip', 'too', 'top', 'toy', 'try', 'two', 'use', 'van', 'war', 'was', 'way', 'web', 'wet', 'who', 'why', 'win', 'won', 'yes', 'yet', 'you', 'zip',
  
  // Common 4+ letter words
  'able', 'about', 'above', 'acid', 'acre', 'acts', 'aged', 'ages', 'aids', 'aims', 'area', 'army', 'arts', 'asks', 'back', 'ball', 'band', 'bank', 'base', 'bath', 'beat', 'been', 'beer', 'bell', 'belt', 'bend', 'best', 'bike', 'bill', 'bird', 'blow', 'blue', 'boat', 'body', 'bone', 'book', 'boom', 'boot', 'born', 'both', 'bowl', 'boys', 'bulk', 'burn', 'busy', 'cake', 'call', 'calm', 'came', 'camp', 'card', 'care', 'cars', 'case', 'cash', 'cast', 'cats', 'cell', 'chat', 'chip', 'city', 'clay', 'clip', 'club', 'coal', 'coat', 'code', 'coin', 'cold', 'come', 'cook', 'cool', 'copy', 'corn', 'cost', 'crew', 'crop', 'cups', 'cute', 'dark', 'data', 'date', 'days', 'dead', 'deal', 'dear', 'debt', 'deck', 'deep', 'desk', 'died', 'diet', 'dish', 'does', 'dogs', 'done', 'door', 'down', 'draw', 'drew', 'drop', 'drug', 'dual', 'duck', 'dumb', 'dust', 'duty', 'each', 'earn', 'ears', 'ease', 'east', 'easy', 'edge', 'eggs', 'else', 'ends', 'even', 'ever', 'evil', 'exit', 'eyes', 'face', 'fact', 'fail', 'fair', 'fall', 'fame', 'fast', 'fate', 'fear', 'feed', 'feel', 'feet', 'fell', 'felt', 'file', 'fill', 'film', 'find', 'fine', 'fire', 'firm', 'fish', 'fist', 'five', 'flag', 'flat', 'fled', 'flow', 'fold', 'food', 'fool', 'foot', 'form', 'fort', 'four', 'free', 'from', 'full', 'fund', 'gain', 'game', 'gave', 'gear', 'gift', 'girl', 'give', 'glad', 'goal', 'goes', 'gold', 'golf', 'gone', 'good', 'grab', 'gray', 'grew', 'grow', 'guys', 'half', 'hall', 'hand', 'hang', 'hard', 'harm', 'hate', 'have', 'head', 'hear', 'heat', 'held', 'hell', 'help', 'here', 'hero', 'hide', 'high', 'hill', 'hint', 'hire', 'hold', 'hole', 'holy', 'home', 'hook', 'hope', 'host', 'hour', 'huge', 'hung', 'hunt', 'hurt', 'idea', 'inch', 'into', 'iron', 'item', 'jazz', 'join', 'joke', 'jump', 'june', 'jury', 'just', 'keep', 'kept', 'keys', 'kick', 'kids', 'kill', 'kind', 'king', 'knew', 'know', 'lack', 'lake', 'land', 'lane', 'last', 'late', 'lawn', 'laws', 'lazy', 'lead', 'leaf', 'lean', 'left', 'legs', 'lens', 'less', 'life', 'lift', 'like', 'line', 'link', 'list', 'live', 'loan', 'lock', 'long', 'look', 'loop', 'lord', 'lose', 'loss', 'lost', 'lots', 'loud', 'love', 'luck', 'lung', 'made', 'mail', 'main', 'make', 'male', 'mall', 'many', 'maps', 'mark', 'mars', 'mass', 'math', 'meal', 'mean', 'meat', 'meet', 'melt', 'menu', 'mesh', 'mice', 'mild', 'mile', 'milk', 'mind', 'mine', 'miss', 'mode', 'moon', 'more', 'most', 'move', 'much', 'must', 'myth', 'name', 'navy', 'near', 'neck', 'need', 'news', 'next', 'nice', 'nine', 'noon', 'norm', 'nose', 'note', 'nuts', 'odds', 'okay', 'once', 'only', 'open', 'oral', 'pack', 'page', 'paid', 'pain', 'pair', 'palm', 'park', 'part', 'pass', 'past', 'path', 'peak', 'pick', 'pile', 'pink', 'pipe', 'plan', 'play', 'plot', 'plus', 'poem', 'poll', 'pool', 'poor', 'port', 'post', 'pour', 'pray', 'pull', 'pure', 'push', 'quit', 'race', 'rage', 'rain', 'rank', 'rare', 'rate', 'rats', 'read', 'real', 'rear', 'rely', 'rent', 'rest', 'rich', 'ride', 'ring', 'rise', 'risk', 'road', 'rock', 'role', 'roll', 'roof', 'room', 'root', 'rope', 'rose', 'rule', 'runs', 'rush', 'safe', 'said', 'sail', 'sake', 'sale', 'salt', 'same', 'sand', 'save', 'seal', 'seat', 'seed', 'seek', 'seem', 'seen', 'self', 'sell', 'send', 'sent', 'sets', 'ship', 'shop', 'shot', 'show', 'shut', 'sick', 'side', 'sign', 'sing', 'sink', 'site', 'size', 'skin', 'skip', 'slip', 'slow', 'snap', 'snow', 'soap', 'soft', 'soil', 'sold', 'sole', 'some', 'song', 'soon', 'sort', 'soul', 'soup', 'spin', 'spot', 'star', 'stay', 'step', 'stop', 'such', 'suit', 'sure', 'swim', 'take', 'tale', 'talk', 'tall', 'tank', 'tape', 'task', 'team', 'tear', 'tell', 'tend', 'term', 'test', 'text', 'than', 'that', 'them', 'then', 'they', 'thin', 'this', 'thus', 'tide', 'tied', 'ties', 'till', 'time', 'tiny', 'tips', 'tire', 'told', 'tone', 'took', 'tool', 'tops', 'torn', 'tour', 'town', 'toys', 'tree', 'trip', 'true', 'tube', 'tune', 'turn', 'twin', 'type', 'unit', 'upon', 'used', 'user', 'uses', 'vary', 'vast', 'view', 'vote', 'wage', 'wait', 'wake', 'walk', 'wall', 'want', 'ward', 'warm', 'warn', 'wash', 'wave', 'ways', 'weak', 'wear', 'week', 'well', 'went', 'were', 'west', 'what', 'when', 'whom', 'wide', 'wife', 'wild', 'will', 'wind', 'wine', 'wing', 'wire', 'wise', 'wish', 'with', 'wolf', 'wood', 'word', 'wore', 'work', 'worn', 'yard', 'year', 'your', 'zero', 'zone',
  
  // Some longer common words
  'about', 'above', 'abuse', 'actor', 'acute', 'admit', 'adopt', 'adult', 'after', 'again', 'agent', 'agree', 'ahead', 'alarm', 'album', 'alert', 'alien', 'align', 'alike', 'alive', 'allow', 'alone', 'along', 'alter', 'among', 'anger', 'angle', 'angry', 'apart', 'apple', 'apply', 'arena', 'argue', 'arise', 'array', 'arrow', 'aside', 'asset', 'avoid', 'awake', 'award', 'aware', 'badly', 'baker', 'bases', 'basic', 'beach', 'began', 'begin', 'being', 'below', 'bench', 'billy', 'birth', 'black', 'blade', 'blame', 'blank', 'blast', 'blind', 'block', 'blood', 'board', 'boost', 'booth', 'bound', 'brain', 'brand', 'brass', 'brave', 'bread', 'break', 'breed', 'brief', 'bring', 'broad', 'broke', 'brown', 'build', 'built', 'buyer', 'cable', 'calif', 'carry', 'catch', 'cause', 'chain', 'chair', 'chaos', 'charm', 'chart', 'chase', 'cheap', 'check', 'chest', 'chief', 'child', 'china', 'chose', 'civil', 'claim', 'class', 'clean', 'clear', 'click', 'climb', 'clock', 'close', 'cloud', 'coach', 'coast', 'could', 'count', 'court', 'cover', 'craft', 'crash', 'crazy', 'cream', 'crime', 'cross', 'crowd', 'crown', 'crude', 'curve', 'cycle', 'daily', 'dance', 'dated', 'dealt', 'death', 'debut', 'delay', 'depth', 'doing', 'doubt', 'dozen', 'draft', 'drama', 'drank', 'dream', 'dress', 'drill', 'drink', 'drive', 'drove', 'dying', 'eager', 'early', 'earth', 'eight', 'elite', 'empty', 'enemy', 'enjoy', 'enter', 'entry', 'equal', 'error', 'event', 'every', 'exact', 'exist', 'extra', 'faith', 'false', 'fault', 'fiber', 'field', 'fifth', 'fifty', 'fight', 'final', 'first', 'fixed', 'flash', 'fleet', 'floor', 'fluid', 'focus', 'force', 'forth', 'forty', 'forum', 'found', 'frame', 'frank', 'fraud', 'fresh', 'front', 'fruit', 'fully', 'funny', 'giant', 'given', 'glass', 'globe', 'going', 'grace', 'grade', 'grain', 'grand', 'grant', 'grass', 'grave', 'great', 'green', 'gross', 'group', 'grown', 'guard', 'guess', 'guest', 'guide', 'happy', 'harry', 'heart', 'heavy', 'hence', 'henry', 'horse', 'hotel', 'house', 'human', 'ideal', 'image', 'index', 'inner', 'input', 'issue', 'japan', 'jimmy', 'joint', 'jones', 'judge', 'known', 'label', 'large', 'laser', 'later', 'laugh', 'layer', 'learn', 'lease', 'least', 'leave', 'legal', 'level', 'lewis', 'light', 'limit', 'links', 'lives', 'local', 'loose', 'lower', 'lucky', 'lunch', 'lying', 'magic', 'major', 'maker', 'march', 'maria', 'match', 'maybe', 'mayor', 'meant', 'media', 'metal', 'might', 'minor', 'minus', 'mixed', 'model', 'money', 'month', 'moral', 'motor', 'mount', 'mouse', 'mouth', 'moved', 'movie', 'music', 'needs', 'never', 'newly', 'night', 'noise', 'north', 'noted', 'novel', 'nurse', 'occur', 'ocean', 'offer', 'often', 'order', 'other', 'ought', 'paint', 'panel', 'paper', 'party', 'peace', 'peter', 'phase', 'phone', 'photo', 'piano', 'piece', 'pilot', 'pitch', 'place', 'plain', 'plane', 'plant', 'plate', 'point', 'pound', 'power', 'press', 'price', 'pride', 'prime', 'print', 'prior', 'prize', 'proof', 'proud', 'prove', 'queen', 'quick', 'quiet', 'quite', 'radio', 'raise', 'range', 'rapid', 'ratio', 'reach', 'ready', 'realm', 'rebel', 'refer', 'relax', 'repay', 'reply', 'right', 'rigid', 'rival', 'river', 'robin', 'roger', 'roman', 'rough', 'round', 'route', 'royal', 'rural', 'scale', 'scene', 'scope', 'score', 'sense', 'serve', 'seven', 'shall', 'shape', 'share', 'sharp', 'sheet', 'shelf', 'shell', 'shift', 'shine', 'shirt', 'shock', 'shoot', 'short', 'shown', 'sides', 'sight', 'silly', 'since', 'sixth', 'sixty', 'sized', 'skill', 'sleep', 'slide', 'small', 'smart', 'smile', 'smith', 'smoke', 'snake', 'snow', 'solid', 'solve', 'sorry', 'sound', 'south', 'space', 'spare', 'speak', 'speed', 'spend', 'spent', 'split', 'spoke', 'sport', 'staff', 'stage', 'stake', 'stand', 'start', 'state', 'steam', 'steel', 'steep', 'steer', 'steve', 'stick', 'still', 'stock', 'stone', 'stood', 'store', 'storm', 'story', 'strip', 'stuck', 'study', 'stuff', 'style', 'sugar', 'suite', 'super', 'sweet', 'swept', 'swift', 'swing', 'swiss', 'table', 'taken', 'taste', 'taxes', 'teach', 'teams', 'teeth', 'terry', 'texas', 'thank', 'theft', 'their', 'these', 'thick', 'thing', 'think', 'third', 'those', 'three', 'threw', 'throw', 'thumb', 'tight', 'tired', 'title', 'today', 'topic', 'total', 'touch', 'tough', 'tower', 'track', 'trade', 'train', 'treat', 'trend', 'trial', 'tribe', 'trick', 'tried', 'tries', 'truly', 'trunk', 'trust', 'truth', 'twice', 'under', 'undue', 'union', 'unity', 'until', 'upper', 'upset', 'urban', 'usage', 'usual', 'valid', 'value', 'video', 'virus', 'visit', 'vital', 'vocal', 'voice', 'waste', 'watch', 'water', 'wheel', 'where', 'which', 'while', 'white', 'whole', 'whose', 'woman', 'women', 'world', 'worry', 'worse', 'worst', 'worth', 'would', 'write', 'wrong', 'wrote', 'young', 'yours', 'youth'
]);

export const validateWord = (word: string): boolean => {
  const normalizedWord = word.toLowerCase().trim();
  
  // Check minimum length
  if (normalizedWord.length < 2) return false;
  
  // Skip simple plurals unless they're meaningful words themselves
  if (normalizedWord.endsWith('s') && normalizedWord.length > 2) {
    const singular = normalizedWord.slice(0, -1);
    if (VALID_WORDS.has(singular) && !VALID_WORDS.has(normalizedWord)) {
      return false;
    }
  }
  
  return VALID_WORDS.has(normalizedWord);
};

export const calculateScore = (word: string): number => {
  // Simple scoring: 1 point per letter
  return word.length;
};

export const checkWordAtPosition = (
  grid: any[][],
  startRow: number,
  startCol: number,
  direction: 'horizontal' | 'vertical'
): string | null => {
  let word = '';
  let row = startRow;
  let col = startCol;
  
  while (
    row >= 0 && row < grid.length && 
    col >= 0 && col < grid[0].length && 
    grid[row][col]
  ) {
    word += grid[row][col].letter;
    
    if (direction === 'horizontal') {
      col++;
    } else {
      row++;
    }
  }
  
  return word.length >= 2 ? word : null;
};