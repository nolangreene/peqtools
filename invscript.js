var tableData = [];

$(document).ready(function() {
	console.log("loaded");
	
	var table = $('#inventories').DataTable({
		"data": tableData,
		"columns": [
			{ 'title' : 'Character' },
			{ 'title' : 'Item',
				'fnCreatedCell': function(nTd, sData, oData, iRow, iCol) {
					$(nTd).html("<a href='http://mqemulator.net/fullsearch.php?iname="+oData[1]+"'>"+oData[1]+"</a>");
				}
			},
			{ 'title' : 'Location' }		
		]
	});
	
	var whateverOriginUrl = 'http://www.whateverorigin.org/get?url=';
	var profileUrl = 'http://peqtgc.com/magelo/index.php?page=character&char=';
	
	characters.forEach(function(curToon) {
		var whateverOriginQuery = whateverOriginUrl + encodeURIComponent(profileUrl + curToon) + '&callback=?';
		$.getJSON(whateverOriginQuery, function(data) {
			addTableData($(data.contents), curToon);
			table.clear();
			table.rows.add(tableData);
			table.draw();
		});
	});
});

var addTableData = function(charPage, toon) {
	for (var slotNum in invSlotsNumToName) {
		var curItem = [];
		searchItem = $('#' + slotNum, charPage).find('a').html();
		if (searchItem) {
			curItem[0] = toon;
			curItem[1] = searchItem;
			curItem[2] = invSlotsNumToName[slotNum];
			tableData.push(curItem);
		}
	}
}